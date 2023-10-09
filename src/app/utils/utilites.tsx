import moment from "moment";

export const sentenceCase = (str: any) => {
  if (str === null || str === "") return false;
  else str = str.toString();

  return str.replace(/\w\S*/g, (txt: any) => {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
};

export const getChartColors = () =>{
  const colorsList1 = ["#0074D9", "#FF4136", "#2ECC40", "#FF851B", "#7FDBFF", "#B10DC9", "#FFDC00", "#001f3f", "#39CCCC", "#01FF70", "#85144b", "#F012BE", "#3D9970", "#111111", "#AAAAAA"];
  const colorsList = ["#dfc731", "#ea88d8", "#113367", "#97698e", "#bac7c1", "#3c3c3c", "#6c54c0", "#b4acfc", "#312360", "#98745c", "#be968c", "#04e484", "#8164fc", "#02824b", "#78787a", "#aca8c8", "#dc346c", "#fcbd9c", "#391d9d", "#aa579f", "#8ea5cc", "#4c325c"];
  return colorsList.concat(colorsList1);
};

export const formatDate = (givenDate:string, reqFormat:string = "MMM-DD, YYYY") => {
  if (!givenDate) {
    return "--";
  } else {
    return moment.utc(givenDate).local().format(reqFormat);
  }
}
