const lottery = {
    calc:{
        calculateOdds(numbers=3,max=10,div=true){
            let odds = []
            if(div==true)div = max**numbers
            else div=1
            for(let x=0;x<=numbers;x++)odds[x] = choose(numbers,x)*(max-1)**(numbers-x)/div
            return odds
        },
        calculateExpectedValue(numbers=3,max=10,multipliers=[],div=true){
            let vals = this.calculateOdds(numbers,max,div)
            let n = 0
            for(let x=0;x<=numbers;x++)n+=multipliers[x]?vals[x]*multipliers[x]:0
            return n
        },
        calculateExpectedGain(numbers=3,max=10,multipliers=[],div=true){
            return this.calculateExpectedValue(numbers,max,multipliers,div)-1
        }
    },
    elements:{
        multipliers:[],
        range:document.getElementById("lottery-range"),
        multiplierButton:document.getElementById("lottery-multipliers-button"),
        multiplierDiv:document.getElementById("lottery-multipliers-inputs"),
        statistics:document.getElementById("lottery-statistics"),
        cost:document.getElementById("lottery-cost")
    },
    multipliers:{
        init(){
            const func = ()=>{
                let input = lottery.elements.range
                let i = input.value
                if(i.length>5)input.value=i.slice(0,5)
                if(i.includes("."))input.value=input.value.replace(".","")
                lottery.update()
            }
            lottery.elements.multiplierButton.addEventListener("click",lottery.multipliers.create)
            lottery.elements.range.addEventListener("input",func)
            lottery.elements.cost.addEventListener("input",func)
        },
        create(){
            let num = lottery.elements.multipliers.length
            let div = document.createElement("div")
            div.num = num
            let input = document.createElement("input")
            input.type = "number"
            input.value = "0"
            input.addEventListener("input",()=>{
                let i = input.value
                if(i.length>5)input.value=i.slice(0,5)
                if(i.includes("."))input.value=input.value.replace(".","")
                lottery.update()
            })
            input.style.textAlign = "left"
            let span1 = document.createElement("span")
            span1.textContent = (num+1)+" number gwa gain: "
            let span2 = document.createElement("span")
            span2.textContent = " "
            let removeBtn = document.createElement("button")
            removeBtn.textContent = "x"
            removeBtn.classList.add("lottery-multipliers-removeBtn")
            removeBtn.addEventListener("click",()=>lottery.multipliers.remove(div.num))
            /*let moveUp = document.createElement("button")
            moveUp.textContent = "^"
            moveUp.addEventListener("click",()=>{
                let n = lottery.elements.multipliers
                if(num==0)return;
                num--
                span1.textContent = (num+1)+" number gwa gain: "
            })
            let moveDown = document.createElement("button")
            moveDown.textContent = "v"
            moveDown.addEventListener("click",()=>{
                if(num==lottery.elements.multipliers.length-1)return;
                num++
                span1.textContent = ()
            })*/
            div.appendChild(span1)
            div.appendChild(input)
            div.appendChild(span2)
            div.appendChild(removeBtn)
            lottery.elements.multiplierDiv.appendChild(div)
            /*div.appendChild(moveUp)
            div.appendChild(moveDown)*/

            lottery.elements.multipliers.push({div,input,num,span:span1})
        },
        remove(num){
            let obj = lottery.elements.multipliers.splice(num,1)[0]
            obj.div.remove()
            for(let x=num;x<lottery.elements.multipliers.length;x++){
                let o = lottery.elements.multipliers[x]
                o.num--
                o.div.num--
                o.span.textContent = (o.num+1)+" number gwa gain: "
            }
        }
    },
    update(){
        let numbers = lottery.elements.multipliers.length
        let range = parseInt(lottery.elements.range.value)
        let vals = [0]
        for(let x=0;x<numbers;x++)vals[x+1]=parseInt(lottery.elements.multipliers[x].input.value)
        let prob = lottery.calc.calculateOdds(numbers,range,false)
        let div = range**numbers
        let txt = "<h3>Probabilities:</h3>"
        for(let x=0;x<numbers;x++)txt+=`${x+1} number${x==0?"":"s"}: ${format(prob[x+1])}/${format(div)} (~${format(prob[x+1]/div*100)}%)<br>`
        let egain = lottery.calc.calculateExpectedValue(numbers,range,vals,false)
        let cost = Number(lottery.elements.cost.value)
        txt+=`<br>Expected gain/ticket: ${format(egain-div*cost)}/${format(div)} (${format(egain/div-cost)})`
        lottery.elements.statistics.innerHTML = txt
    }
}

lottery.multipliers.init()