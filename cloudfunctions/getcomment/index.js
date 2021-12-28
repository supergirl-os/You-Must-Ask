// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
var db=cloud.database();

// 云函数入口函数
exports.main = async (event, context) => {

 try{
  //等待结果返回，必须配合async使用
    return await db.collection('question').where({
      _id:event.id
    }).get();
}catch(err){
  console.log('err=>>',err);
}
}