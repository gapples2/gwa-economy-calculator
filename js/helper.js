function factorial(x){
    let n = 1
    for(let a=2;a<=x;a++)n*=a
    return n
}

function choose(n,p){
    return factorial(n)/factorial(n-p)/factorial(p)
}

function removeTrailingZeros(n){
    if(!n.includes("."))return n
    while(n.length>0){
        let end = n[n.length-1]
        if(end=="0"){n=n.slice(0,-1)}
        else if(end=="."){
            n=n.slice(0,-1)
            return n
        }else return n
    }
}

function commaify(x) {
    return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
}

function format(x){
    if((typeof x)!="number")x=Number(x)
    if(x>=1e9){
        let e = Math.floor(Math.log10(x))
        let m = x/10**e
        if(m.toFixed(3)=="1.000"){
            m = 1
            e++
        }
        return m.toFixed(3)+"e"+e
    }
    return x.toLocaleString("en-US",{maximumFractionDigits:5})
}

function save(){
    localStorage.setItem("gwa-economy",JSON.stringify({
        lottery:{
            range:lottery.elements.range.value
        }
    }))
}