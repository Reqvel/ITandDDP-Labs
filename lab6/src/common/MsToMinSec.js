export function msToMinSec(s) {
    var ms = s % 1000;
    s = (s - ms) / 1000;
    var secs = s % 60;
    s = (s - secs) / 60;
    var mins = s % 60;
    var minSec = secs > 9 ? (mins + ':' + secs) : (mins + ':0' + secs );
    return minSec
}