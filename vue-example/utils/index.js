export const getFullTime = (time) => {
    let year = time.getFullYear()
    let month = time.getMonth()
    let day = time.getDate();
    return { year,month: month+1,day, }
}

export const transformTimeStamp = (day) => {
    return day * 24 * 60 * 60 * 1000;
}



export const getFirstDayWeek = (date) => {
    let { day } = getFullTime(date)
    let firstDay = date.getTime() - transformTimeStamp(day - 1);
    let week = new Date(firstDay).getDay()
    return {week , monthFirstDay: new Date(firstDay)};
}

