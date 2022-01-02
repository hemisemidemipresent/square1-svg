const regex = /\([-]?[0-6],[-]?[0-6]\)/;
const svg2png = require('svg-png-converter');

class Square1 {
    constructor(alg, config) {
        if (config) var { rotation, png } = config;
        this.tPieces = [2, 1, 2, 1, 2, 1, 2, 1];
        this.bPieces = [2, 1, 2, 1, 2, 1, 2, 1];
        this.tRot = 0;
        this.bRot = 0;
        let instructions = this.parseAlg(alg);

        instructions.forEach((instruction, i) => {
            if (typeof instruction == 'string') this.slice();
            else this.shift(instruction, instructions.length == i + 1);
        });
    }
    parseAlg(alg) {
        let arr = [];
        let instructions = [];
        let str = '';
        for (let i = 0; i < alg.length; i++) {
            if (/\s/.test(alg[i])) continue;
            else if (alg[i] == '/') {
                if (str.length) {
                    arr.push(str);
                    str = '';
                }
                arr.push('slice');
            } else str += alg[i];
        }
        arr.push(str);
        for (let i = 0; i < arr.length; i++) {
            let instruction = arr[i];
            if (regex.test(instruction)) {
                let keys = instruction.substring(1, instruction.length - 1).split(',');
                instructions.push({
                    top: parseInt(keys[0]),
                    bottom: parseInt(keys[1])
                });
            } else if (instruction == 'slice') {
                // removes double slices
                if (i != 0 && instructions[i - 1] == 'slice') instructions.pop();
                else instructions.push('slice');
            }
        }
        return instructions;
    }
    slice() {
        let t = this.check(this.tPieces);
        let b = this.check(this.bPieces);

        let temp1 = this.tPieces.slice(0, t).reverse();
        let temp2 = this.bPieces.slice(0, b).reverse();

        this.tPieces = [...temp2, ...this.tPieces.slice(t, this.tPieces.length)];
        this.bPieces = [...temp1, ...this.bPieces.slice(b, this.bPieces.length)];
    }
    check(pieces, n = 6) {
        if (n == 0) return 0;
        if (n < 0) n = (n % 12) + 12;
        let sum = 0;
        let pieceCount = 0;
        for (let i = 0; i < pieces.length; i++) {
            sum += pieces[i];
            if (sum <= n) ++pieceCount;
            if (sum == n) break;
            if (sum > n)
                throw new Error(
                    `Something fucked up while turning the square 1:\nPieces:${pieces}\nn:${n}`
                );
        }
        return pieceCount;
    }
    shift(instruction, isFinal = false) {
        let { top, bottom } = instruction;

        if (isFinal) {
            this.tRot = top * 30;
            this.bRot = -bottom * 30;
            return;
        }
        let t = this.check(this.tPieces, -top);
        let b = this.check(this.bPieces, bottom);
        this.tPieces = this.move(this.tPieces, t);
        this.bPieces = this.move(this.bPieces, b);
    }
    //moveElementsToEndOfArray
    move(arr, x) {
        if (x == 0) return arr;
        let n = arr.length;
        if (x > 0) {
            x = x % n;
            let first_x_elements = arr.slice(0, x);
            let remaining_elements = arr.slice(x, n);
            return [...remaining_elements, ...first_x_elements];
        } else if (x < 0) {
            x = Math.abs(x);
            x = x % n;
            let first_x_elements = arr.slice(0, n - x);
            let remaining_elements = arr.slice(x, n);
            return [...remaining_elements, ...first_x_elements];
        }
    }
    toSVG() {
        const r = 10; // "radius" of square (1/2 side length)
        let svg =
            '<svg xmlns="http://www.w3.org/2000/svg" viewBox = "0 0 30 60" height="300" width="150"><style>polygon{stroke-width:0.25;stroke:black;stroke-linejoin:round;}</style>'; //fill:white;
        // top

        svg += '<g transform="translate(15 15)">';
        let angle = this.tRot + 15;
        for (let i = 0; i < this.tPieces.length; i++) {
            let piece = this.tPieces[i];
            if (piece == 1) {
                let offset = r * Math.tan(Math.PI / 12);
                let points = `0,0 ${-offset},-10 ${offset},-10`;
                svg += `<polygon points="${points}" stroke-width="0.25" stroke="black" stroke-linejoin="round" transform="rotate(${angle})" fill="white"/>`;
            } else {
                let x = r / Math.cos(Math.PI / 12);
                let offset = x * Math.sin(Math.PI / 6);
                let h = x * Math.sqrt(3) * 0.5;
                let points = `0,0 ${-offset},${-h} 0,${-Math.sqrt(2) * r} ${offset},${-h}`;
                svg += `<polygon points="${points}" stroke-width="0.25" stroke="black" stroke-linejoin="round" transform="rotate(${
                    angle + 15
                })" fill="white"/>`;
            }
            angle += piece * 30;
        }
        svg += '</g>';

        svg += '<g transform="translate(15 45)">';
        angle = -this.bRot + 180 - 15;
        for (let i = 0; i < this.bPieces.length; i++) {
            let piece = this.bPieces[i];
            if (piece == 1) {
                let offset = r * Math.tan(Math.PI / 12);
                let points = `0,0 ${-offset},-10 ${offset},-10`;
                svg += `<polygon points="${points}" stroke-width="0.25" stroke="black" stroke-linejoin="round" transform="rotate(${angle})" fill="white"/>`;
            } else {
                let x = r / Math.cos(Math.PI / 12);
                let offset = x * Math.sin(Math.PI / 6);
                let h = x * Math.sqrt(3) * 0.5;
                let points = `0,0 ${-offset},${-h} 0,${-Math.sqrt(2) * r} ${offset},${-h}`;
                svg += `<polygon points="${points}" stroke-width="0.25" stroke="black" stroke-linejoin="round" transform="rotate(${
                    angle - 15
                })" fill="white"/>`;
            }
            angle -= piece * 30;
        }
        svg += '</g>';
        svg += '</svg>';
        return svg;
    }
    toPNG() {
        let svg = this.toSVG().trim();
        let s = await svg2png({
            input: svg,
            encoding: 'dataURL',
            format: 'jpeg',
            width: 100,
            height: 100,
            multiplier: 0.7,
            quality: 0.5
        });
    }
}
module.exports = Square1;
