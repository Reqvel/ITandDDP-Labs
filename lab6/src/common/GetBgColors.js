export function getBgColors(imgObj) {
    const context = document.createElement("canvas").getContext("2d");
    context.drawImage(imgObj, 0, 0, 2, 2);
    const i = context.getImageData(0, 0, 1, 1).data;
  
    const midColor = `rgba(${i[0]},${i[1]},${i[2]},${i[3]})`
    const colorChange = function(c,n,i,d){for(i=3;i--;c[i]=d<0?0:d>255?255:d|0)d=c[i]+n;return c}
    const j = colorChange([i[0], i[1], i[2]], 15)
    const topColor = `rgba(${j[0]},${j[1]},${j[2]},${i[3]})`

    return [topColor, midColor]
  }