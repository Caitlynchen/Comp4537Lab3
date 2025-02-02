// modules/utils.js

function getDate(name) {
    const date = new Date(); 
    return `<p style="color: blue;">Hello ${name}, What a beautiful day. Server current date and time is ${date}</p>`;
}

module.exports = { getDate };
