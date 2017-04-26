'use strict';

module.exports = app => {
  class DemandController extends app.Controller {
    * create() {
      const rule = {
        title: { type: 'string', required: true },
        charge: { type: 'string', required: true },
        developer: { type: 'array' },
        deadLine: { type: 'number', required: true },
      };
      const userId = this.ctx.request.user.userId;
      this.ctx.request.body.author = userId;
      this.ctx.validate(rule);
      yield this.app.model.demand.create(this.ctx.request.body);
      this.ctx.status = 201;
    }
    * destroy() {
      const id = this.ctx.params.id;
      yield this.app.model.demand.remove({ _id: id });
      this.ctx.status = 200;
    }
    * update() {
      const id = this.ctx.params.id;
      yield this.app.model.demand.findOneAndUpdate({ _id: id }, this.ctx.request.body);
      this.ctx.status = 204;
    }
    * show() {
      const id = this.ctx.params.id;
      const result = yield this.app.model.demand.findOne({ _id: id });
      this.ctx.body = result;
    }
    * index() {
      this.ctx.body = yield this.app.model.demand.find({});
    }
  }
  return DemandController;
};
