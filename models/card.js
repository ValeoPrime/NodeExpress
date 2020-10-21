const fs = require("fs");
const path = require("path");

class Card {
    static async addCourse(course){
        const card = await Card.fetch()

        const idx = card.courses.findIndex(item => item.id === course.id)
        const candidate = card.courses[idx]

        if(candidate){
            candidate.count++
            card.courses[idx] = candidate
        } else {
            course.count = 1
            card.courses.push(course)
        }

        card.price += +course.price

        return new Promise((resolve, reject) => {
            fs.writeFile(path.join(__dirname, "..", "data", "card.json"), JSON.stringify(card), (err)=> {
                if(err) {
                    reject( err)
                } else {
                    resolve ()
                }
            })
        })
    }

    static async fetch() {
        return new Promise((resolve, reject) => {
            fs.readFile(
                path.join(__dirname, "..", "data", "card.json"),
                "utf-8", (err, content) => {
                    if(err) {
                        reject( err)
                    } else {
                        resolve (JSON.parse(content))
                    }
                }
              );
        })
    }

    static async remove (id) {
        const card = await Card.fetch()

        const idx = card.courses.findIndex(item => item.id === id)
        const course = card.courses[idx]
        
        if(course.count === 1){
            //Удаляем курс
            card.courses = card.courses.filter(c => c.id !== id)
        } else {
            //Уменьшаем количество курсов в корзине
            card.courses[idx].count--
        }

        card.price -= course.price

        return new Promise((resolve, reject) => {
            fs.writeFile(path.join(__dirname, "..", "data", "card.json"), JSON.stringify(card), (err)=> {
                if(err) {
                    reject( err)
                } else {
                    resolve (card)
                }
            })
        })
    }
}

module.exports = Card