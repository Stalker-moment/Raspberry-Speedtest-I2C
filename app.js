const { UniversalSpeedtest, SpeedUnits } = require('universal-speedtest');
var delay = require('sleep');
const LCD = require('raspberrypi-liquid-crystal');            

const lcd = new LCD(1, 0x27, 20, 4);

async function printidle(){
    await lcd.printLine(0, 'Test Network');
    await lcd.printLine(1, '------------');
    await lcd.printLine(2, 'Press Button');
    await lcd.printLine(3, '------------');
  }

async function printclear() {
    await lcd.clear();
}

async function printvalue(ping, jitter, download, upload){
    await lcd.printLine(0, `Ping : ${ping}ms`);
    await lcd.printLine(1, `Jitter : ${jitter}ms`);
    await lcd.printLine(2, `↓ ${download}mbps`);
    await lcd.printLine(3, `↑ ${upload}mbps`);
    delay.sleep(10)
    await lcd.clear();
  }

    const universalSpeedtest = new UniversalSpeedtest({
        measureUpload: true,
        downloadUnit: SpeedUnits.Mbps
    });

    universalSpeedtest.runSpeedtestNet().then(result => {
        console.log(result);
        printvalue(result.ping, result.jitter, result.downloadSpeed, result.uploadSpeed)
        const sptstxt = `-----Result Speedtest-----\n\n• *Ping :* ${result.ping} ms\n• *Jitter :* ${result.jitter}\n• *Download Speed* : ${result.downloadSpeed} mbps\n• *Upload Speed* : ${result.uploadSpeed} mbps\n• *Time Measure :* ${result.totalTime} ms`
        printclear()
        printidle()
    }).catch(e => {
        console.error(e.message);
    });