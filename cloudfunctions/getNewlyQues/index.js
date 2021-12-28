// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
var db = cloud.database();
// 云函数入口函数
exports.main = async (event, context) => {
// console.log('event=>',event);
  try{
  //等待结果返回，必须配合async使用
    return await db.collection('question').where({
      [event.key]:event.value
    }).get();
}catch(err){
  console.log('err=>>',err);
}
}