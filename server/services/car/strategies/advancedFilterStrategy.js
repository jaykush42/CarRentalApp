
const Car = require('../../../models/Car');
const { parseISO } = require('date-fns');

class AdvancedFilterStrategy {
  constructor(filterData) {
    this.filterData = filterData;
  }

  async filter() {
    const {
      city,
      category,
      startDate,
      endDate,
      minPrice,
      maxPrice
    } = this.filterData;

    const parsedStart = startDate ? parseISO(startDate) : null;
    const parsedEnd = endDate ? parseISO(endDate) : null;

    // Step 1: Build base match filter
    const matchQuery = {
      city,
      available: true
    };

    if (category) {
      matchQuery.category = category;
    }

    if (minPrice || maxPrice) {
      matchQuery.pricePerDay = {
        ...(minPrice && { $gte: Number(minPrice) }),
        ...(maxPrice && { $lte: Number(maxPrice) })
      };
    }

    const pipeline = [{ $match: matchQuery }];

    // Step 2: Filter by availability for the requested date range
    if (parsedStart && parsedEnd) {
      pipeline.push(
        {
          $lookup: {
            from: 'bookings',
            localField: '_id',
            foreignField: 'car',
            as: 'bookings'
          }
        },
        {
          $addFields: {
            conflictingBookings: {
              $filter: {
                input: '$bookings',
                as: 'booking',
                cond: {
                  $and: [
                    { $lt: ['$$booking.startDate', parsedEnd] },
                    { $gt: ['$$booking.endDate', parsedStart] }
                  ]
                }
              }
            }
          }
        },
        {
          $match: {
            conflictingBookings: { $size: 0 }
          }
        },
        {
          $project: {
            bookings: 0,
            conflictingBookings: 0
          }
        }
      );
    }

    const availableCars = await Car.aggregate(pipeline);
    return availableCars;
  }
}

module.exports = AdvancedFilterStrategy;
