'use strict';
// 需求模型
module.exports = mongoose => {
  const DemandSchema = new mongoose.Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    state: { type: String, enum: [ 'WORKING', 'FINISH' ], default: 'WORKING' },
    detail: { type: String },
    charge: { type: String, required: true }, // 负责人
    developer: { type: Array }, // 参与开发人员
    requirement: { type: Array }, // 要求
    deadLine: { type: Number, required: true }, // 结束时间
  });
  return mongoose.model('Demand', DemandSchema);
};
