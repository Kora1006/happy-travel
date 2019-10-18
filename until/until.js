
/**
 * @desc: 计算相隔时间
 * 
 * @param: 参数 | 属性说明 | 参考值
 * @param: arr_time | 到达时间 | 14：10
 * @param: dep_time | 出发时间 | 12: 00
 * 
 * @return: 相隔时间的字符串
 */

 export function computeTime(arr_Time,dep_Time){
    let arr_time = arr_Time.split(":");
    let dep_time = dep_Time.split(":");
   

    //   如果是第二天
    if (arr_time[0] < dep_time[0]) {
      arr_time[0] += 24;
    }
    let start = dep_time[0] * 60 + +dep_time[1];
    let end = arr_time[0] * 60 + +arr_time[1];
    let hour = Math.floor((end - start) / 60);
    let min = (end - start) % 60;
    return `${hour}小时${min}分钟`;
 }