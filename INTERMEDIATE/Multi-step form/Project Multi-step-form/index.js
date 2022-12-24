const divContent=document.querySelector(".main-block__contenido")
const divButtons=document.querySelector(".main-block__button")

class StageForm{
    constructor({
        nodoButtons,
        nodoContent
    }){
        this.currentStep=1;
        this.stageButton=[
            {
                step:1,
                text:"your info"
            },
            {
                step:2,
                text:"select plan"
            },
            {
                step:3,
                text:"add-ons"
            },
            {
                step:4,
                text:"summary"
            }
        ];
        this.plan_type={
            periodo:{
                mo:{
                    acronym:'mo',
                    name:'monthly'
                },
                yr:{
                    acronym:'yr',
                    name:'annually'
                }
            },
            type_plan:[
                ['arcade',9,'icon-arcade.svg'],
                ['advanced',12,'icon-advanced.svg'],
                ['pro',15,'icon-pro.svg']
            ]
        };
        this.info_user={
            name_user:'',
            email_user:'',
            phone_user:''
        };
        this.nodoButtons=nodoButtons;
        this.nodoContent=nodoContent;
    }
    startStageForm(){
        this.loadButtons()
        this.loadStructureContent()
        this.activeButton()
    }
    loadButtons(){
        const divBotones=document.createElement('div')
        divBotones.classList.add('main-block__divBoton')

        this.stageButton.map(boton=>{
            const divBoton=document.createElement('div')
            divBoton.classList.add('buttonContent')

            const botonStep=document.createElement('button')
            botonStep.textContent=`${boton.step}`
            botonStep.classList.add('buttonContent__button')

            const botonInfo=document.createElement('div')
            botonInfo.classList.add('buttonContent__info')
            const botonInfo_p1=document.createElement('p')
            botonInfo_p1.textContent=`STEP ${boton.step}`
            const botonInfo_p2=document.createElement('p')
            botonInfo_p2.textContent=`${boton.text.toUpperCase()}`

            botonInfo.append(botonInfo_p1,botonInfo_p2)

            divBoton.append(botonStep,botonInfo)

            divBotones.appendChild(divBoton)
        })
        this.nodoButtons.append(divBotones)
    }
    activeButton(){
        const botones=document.querySelectorAll('.buttonContent__button')
        botones.forEach(boton=>{
            if(parseInt(boton.textContent)===this.currentStep){
                boton.classList.add('--active')
            }else{
                if(boton.classList.contains('--active')){
                    boton.classList.remove('--active')
                }
            }
        })

        const leftButton=document.querySelector('.--left-button')
        const buttonsDiv=document.querySelector('.stageContent__botones')

        if(this.currentStep!==1){
            leftButton.classList.add('show')
        }else{
            leftButton.classList.remove('show')
        }
        if(this.currentStep===5){
            buttonsDiv.classList.add('none')
        }
        this.contentStage()
        
    }
    nextButtonFunction(){
        if(this.currentStep<4){
            this.currentStep+=1
            this.activeButton()
        }else{
            this.currentStep=5
            this.activeButton()
        }

    }
    backButtonFunction(){
        if(this.currentStep<=4){
            this.currentStep-=1
            this.activeButton()
        }

    }
    loadStructureContent(){
        const divContent=document.createElement('div')
        divContent.classList.add('stageContent')

        const content=document.createElement('div')
        content.classList.add('stageContent__contenido')

        const botones=document.createElement('div')
        botones.classList.add('stageContent__botones')

        const backButton=document.createElement('button')
        backButton.textContent='Go Back'
        backButton.classList.add('--left-button')
        
        const nextButton=document.createElement('button')
        nextButton.classList.add('--right-button')
        nextButton.textContent='Next Step'

        botones.append(backButton,nextButton)

        divContent.append(content,botones)
        this.nodoContent.appendChild(divContent)
    }
    clear(){
        const divContent=document.querySelector('.stageContent__contenido')
        divContent.innerHTML=''
    }
    contentStage(){
        this.clear()
        switch(this.currentStep){
            case 1:
                this.stage1()
                break
            case 2:
                this.stage2()
                break
        }
    }

    stage1(){
        const divContent=document.createElement('div')
        divContent.classList.add('stage')

        const divTitle=document.createElement('div')
        divTitle.classList.add('title')
        const h2=document.createElement('h2')
        h2.textContent='Personal info'
        const p=document.createElement('p')
        p.textContent='Please provide your name,email,address, and phone number'
        divTitle.append(h2,p)

        const divForm=document.createElement('div')
        divForm.classList.add('stage1__form')

        const label1=document.createElement('label')
        label1.textContent='Name'
        const input1=document.createElement('input')
        input1.value=this.info_user.name_user

        const label2=document.createElement('label')
        label2.textContent='Email Address'
        const input2=document.createElement('input')

        const label3=document.createElement('label')
        label3.textContent='Phone Number'
        const input3=document.createElement('input')
        divForm.append(label1,input1,label2,input2,label3,input3)


        divContent.append(divTitle,divForm)
        document.querySelector('.stageContent__contenido').appendChild(divContent)
    }
    stage2(){
        const divContent=document.createElement('div')
        divContent.classList.add('stage')

        const divTitle=document.createElement('div')
        divTitle.classList.add('title')
        const h2=document.createElement('h2')
        h2.textContent='Select your plan'
        const p=document.createElement('p')
        p.textContent='You have the option of monthly or yearly billing.'
        divTitle.append(h2,p)

        const divPlan=document.createElement('div')
        divPlan.classList.add('stage')

        this.plan_type.type_plan.map(plan=>{
            const divPlanContent=document.createElement('div')
            divPlanContent.classList.add('stage2Card')

            const imgPlan=document.createElement('img')
            imgPlan.setAttribute('src',`/assets/images/${plan[2]}`)

            const infoPlan=document.createElement('div')
            infoPlan.classList.add('stage2Card__info')
            const namePlan=document.createElement('p')
            namePlan.textContent=`${plan[0].charAt(0).toUpperCase() + plan[0].slice(1)}`
            const pricePlan=document.createElement('div')
            infoPlan.append(namePlan,pricePlan)

            divPlanContent.append(imgPlan,infoPlan)
            divPlan.append(divPlanContent)
        })

        const divButon=document.createElement('div')
        divButon.classList.add('buttonPlan')
        const pMonthly=document.createElement('p')
        const monthlyName=this.plan_type.periodo.mo.name
        pMonthly.textContent=`${monthlyName.charAt(0).toUpperCase() + monthlyName.slice(1)}`
        const pYearly=document.createElement('p')
        const yearlyName=this.plan_type.periodo.yr.name
        pYearly.textContent=`${yearlyName.charAt(0).toUpperCase() + yearlyName.slice(1)}`
        const buttonLabel=document.createElement('label')
        buttonLabel.classList.add('switch')
        const inputLabel=document.createElement('input')
        inputLabel.setAttribute('type','checkbox')
        const spanLabel=document.createElement('span')
        spanLabel.classList.add('slider')
        spanLabel.classList.add('round')
        buttonLabel.append(inputLabel,spanLabel)
        divButon.append(pMonthly,buttonLabel,pYearly)
      

        divContent.append(divTitle,divPlan,divButon)
        document.querySelector('.stageContent__contenido').appendChild(divContent)
    }
}

const stageForm = new StageForm({
    nodoButtons:divButtons,
    nodoContent:divContent
})

stageForm.startStageForm()

function rightClick(){
    stageForm.nextButtonFunction()
}

function leftClick(){
    stageForm.backButtonFunction()
}

const rightButton=document.querySelector('.--right-button')
const leftButton=document.querySelector('.--left-button')
rightButton.addEventListener('click',rightClick)
leftButton.addEventListener('click',leftClick)


