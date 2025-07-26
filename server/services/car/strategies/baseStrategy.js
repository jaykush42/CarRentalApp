class BaseCarFilterStrategy {
  async filter() {
    throw new Error('filter() must be implemented in subclass');
  }
}

module.exports = BaseCarFilterStrategy;
