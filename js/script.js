
let klickpower = 1
let procentklick = 0.0
let critklick = 0.01
let multiplikationklick = 0
let potens = 1

let pointsvalue = document.getElementById("score");
let points = 0
let totalpoints = 0

let cooldown = false
let countdown = 0

let rr = false



let tile = document.getElementById("tilebail")
let musik = document.getElementById("music")

let menu = document.getElementById("sidemenu")

let rundtryckknapp = document.createElement("div")
rundtryckknapp.classList.add("rundtryckknapp")

let klickabutton = document.createElement("button")
klickabutton.textContent = "Klick!"
klickabutton.id = "tryckknapp"
document.body.appendChild(klickabutton)
buttonparameters(klickabutton)
mittimellan(klickabutton)
klickabutton.style.display = "none";
klickabutton.style.fontSize = "xx-large"

klickabutton.addEventListener("click", function() {

    klick()
    pointsvalue.textContent = "Dina poäng: " + Math.round(points)
    if (points >= 5) {
        menubutton.style.display = "block"
        klickupgrade.style.display = "block"
    }
    if (totalpoints >= 200000 && cooldown === false && countdown < 5) {
        move()
        countdown++
    } else if (totalpoints >= 200000 && cooldown === false && countdown >= 5) {
        countdown = 0
        cooldown = true
        setTimeout(() => {
            cooldown = false
        },60000)
        mittimellan(klickabutton)
    }
    
    
})

let menubutton = document.getElementById("menuBtn")
menubutton.addEventListener("click", function() {
    menu.classList.toggle("open")
})

let klickupgrade = document.getElementById("klickupgrade")
let klickupgradeprice = 10
let klickupgradevalue = 0
klickupgrade.addEventListener("click", function() {
    if (points >= klickupgradeprice) {
        klickpower += 1
        points -= klickupgradeprice
        klickupgradevalue += 1
        pointsvalue.textContent = "Dina poäng: " + Math.round(points)
        klickupgradeprice = upgradeonepricing(klickupgradeprice, klickupgradevalue)
        klickupgrade.textContent = "LVL " + klickupgradevalue + ". Upgradera klicken: " + Math.round(klickupgradeprice)
    }
    if (klickupgradevalue === 4) {
        procentupgrade.style.display = "block"
    }
})

let procentupgrade = document.getElementById("procentklick")
let procentupgradevalue = 1
procentupgrade.addEventListener("click", function() {
    if (procentupgradevalue >= 100) {
        procentupgrade.textContent = "LVL " + procentupgradevalue + ". Lägga till litet % bonus till klicken!: MAX"
        procentupgrade.style.color = "red"
    } else {
        if (points >= upgradetwopricing(procentupgradevalue)) {
            procentklick += 0.1
            points -= upgradetwopricing(procentupgradevalue)
            procentupgradevalue += 1
            pointsvalue.textContent = "Dina poäng: " + Math.round(points)
            procentupgrade.textContent = "LVL " + (procentupgradevalue - 1) + ". Lägga till litet % bonus till klicken!: " + upgradetwopricing(procentupgradevalue)
        }
    }
    if (procentupgradevalue >= 10) {
        critupgrade.style.display = "block"
    }
})

let critupgrade = document.getElementById("critchansklick")
let critupgradeprice = 1000
let critupgradevalue = 0
critupgrade.addEventListener("click", function() {
    if (points >= critupgradeprice) {
        critklick += 0.025
        points -= critupgradeprice
        critupgradevalue += 1
        critupgradeprice = upgradethreepricing(critupgradevalue)
        pointsvalue.textContent = "Dina poäng: " + Math.round(points)
        critupgrade.textContent = "LVL " + critupgradevalue + ". Klicken får chansen att göra crits!: " + Math.round(critupgradeprice)
    }
    if (critupgradevalue >= 5) {
        multiplikationupgrade.style.display = "block"
    }
})

let multiplikationupgrade = document.getElementById("multipliceringkling")
let multiplikationupgradeprice = 10000
let multiplikationupgradevalue = 0
multiplikationupgrade.addEventListener("click", function() {
    if (points >= multiplikationupgradeprice) {
        multiplikationklick++
        points -= multiplikationupgradeprice
        multiplikationupgradevalue++
        multiplikationupgradeprice = upgradefourpricing(multiplikationupgradevalue)
        pointsvalue.textContent = "Dina poäng: " + Math.round(points)
        multiplikationupgrade.textContent = "LVL " + multiplikationupgradevalue + ". Klicken multipliceras!: " + multiplikationupgradeprice
    }
    if (multiplikationupgradevalue >= 5) {
        potensupgrade.style.display = "block"
    }
})

let potensupgrade = document.getElementById("upphojaklick")
let potensupgradeprice = 100000
let potensupgradevalue = 0
potensupgrade.addEventListener("click", function() {
    if (points >= potensupgradeprice) {
        potens++
        points -= potensupgradeprice
        potensupgradevalue++
        potensupgradeprice = upgradefivepricing(potensupgradevalue)
        pointsvalue.textContent = "Dina poäng: " + Math.round(points)
        potensupgrade.textContent = "LVL " + potensupgradevalue + ". Klicken upphöjs!: " + Math.round(potensupgradeprice)
    }
})

let start = document.getElementById("startknapp")
start.addEventListener("click", function() {
    
    switch (points) {
        case 0:
            start.textContent = "En gång till!"
            pointsvalue.style.display = "block";
            points = points + 1
            break;
        case 1:
            buttonparameters(start)
            points = points + 1
            break;
        case 2:
            mittimellan(start)
            start.textContent = "En sista gång!"
            points = points + 1
            break;
        case 3:
            start.remove()

            let startspelbutton = document.createElement("button")
            startspelbutton.textContent = "Start!"
            startspelbutton.id = "startbutton"
            document.body.appendChild(startspelbutton)
            buttonparameters(startspelbutton)
            mittimellan(startspelbutton)

            startspelbutton.addEventListener("click", function() {
                points = 0
                startspelbutton.remove()
                klickabutton.style.display = "block"
            })
            break;
    }
    
})


function buttonparameters(button) {
    button.style.padding = "25px";
    button.style.fontSize = "large";
    button.style.margin = "15px";
}

function mittimellan(button) {
    button.style.position = "absolute";
    button.style.left = "50%";
    button.style.top = "50%";
    button.style.transform = "translate(-50%, -50%)";
}

function klick() {
    let i = 0
    if (Math.random() < critklick && 1 > critklick) {
        i = (2 + 2 * critklick) * (((multiplikationklick+1) * (klickpower + klickpower * procentklick)) ** potens)
        points += i
        pointsaddanimation(i, "red") 
    } else if (critklick > 1) {
        i = (5 + 0.1 * (5 * critklick)) * (((multiplikationklick+1) * (klickpower + klickpower * procentklick)) ** potens)
        points += i
        pointsaddanimation(i, "orange") 
    } else if (Math.random() < 0.01 && rr != true) {
        tile.style.display = "block"
        i = 10 * ((klickpower + klickpower * procentklick) * (multiplikationklick+1)) ** potens
        points += i
        rr = true
        musik.currentTime = 0
        musik.play()
        setTimeout(() => {
            tile.style.display = "none"
            musik.pause()
            musik.currentTime = 0
            rr = false
        },4500)
        pointsaddanimation(i, "lime")
    } else {
        i = ((klickpower + klickpower * procentklick) * (multiplikationklick+1)) ** potens
        points += i
        pointsaddanimation(i, "black")
    }
    totalpoints += i
    return points
}

function pointsaddanimation(pts, color) {
    let plus = document.createElement("span")
    plus.textContent = Math.round(pts)
    plus.classList.add("plusClass")

    let cirkel = klickabutton.getBoundingClientRect()
    let centerX = cirkel.left + cirkel.width / 2
    let centerY = cirkel.top + cirkel.height / 2

    let randomangle = Math.random() * 2 * Math.PI
    let francenterradius = 65 + Math.random() * 20

    let x = centerX + Math.cos(randomangle) * francenterradius
    let y = centerY + Math.sin(randomangle) * francenterradius

    plus.style.left = x + "px"
    plus.style.top = y + "px"
    plus.style.fontSize = "larger"
    plus.style.color = color

    document.body.appendChild(plus)

    setTimeout(function(){
        plus.remove()
    },1000)
}

function move() {
    klickabutton.style.left = Math.random() * 80 + "%";
    klickabutton.style.top = Math.random() * 80 + "%";
    cooldown = true
    setTimeout(() => {
        cooldown = false
    },60000)
}

function upgradeonepricing(newprice, upgradelvl) {
    newprice = newprice + (newprice * upgradelvl)/2
    return newprice
}

function upgradetwopricing(upgradelvl) {
    return 100 * upgradelvl
}

function upgradethreepricing(x) {
    return 1000 * 1.25 ** x
}

function upgradefourpricing(upgradelvlmultiplikation) {
    return (upgradelvlmultiplikation/10 * 2) * 1000 + 10000
}

function upgradefivepricing(lvlupgrade) {
    return 100000 * lvlupgrade
}