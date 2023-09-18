const textElement = document.getElementById('text')
const optionButtonsElement = document.getElementById('option-buttons')

let state = {}

function startGame()
{
    state = {}
    showTextNode(1)
}

function showTextNode(textNodeIndex)
{
    const textNode = textNodes.find(textNode => textNode.id === textNodeIndex)
    textElement.innerText = textNode.text
    while (optionButtonsElement.firstChild) {
        optionButtonsElement.removeChild(optionButtonsElement.firstChild)
    }

    textNode.options.forEach(option => {
        if (showOption(option)) {
            const button = document.createElement('button')
            button.innerText = option.text
            button.classList.add('btn')
            button.addEventListener('click', () => selectOption(option))
            optionButtonsElement.appendChild(button)
        }
    })
}

function showOption(option)
{
return option.requiredState == null || option.requiredState(state)
}

function selectOption(option)
{
    const nextTextNodeId = option.nextText
    if (nextTextNodeId <= 0)
    {
        return startGame()
    }
    state = Object.assign(state, option.setState)
    showTextNode(nextTextNodeId)
}

const textNodes = [
    {
        id: 1,
        text: 'Huomaatteko kouluterkan kävelevän ohi?',
        options: [
            {
                text: 'En.',
                nextText: 2
            },
            {
                text: 'Joo',
                setState: { Joo: true},
                nextText: 2
            }
        ]
    },
    {
        id: 2,
        text: 'Pue sakarille villapaita?',
        option: [
            {
                text: 'En varmasti pue.',
                requiredState: (currentState) => currentState.Joo,
                setState: { Joo: false, Jatkuu: true },
                nextText: 3
            },
            {
                text: 'No OK!',
                requiredState: (currentState) => currentState.Joo,
                setState: { Joo: false, Toka: true },
                nextText: 3 
            },
            {
                text: 'Etkö tosiaa nähny sitä terkkarii?',
                nextText: 3
            }
        ]
    },
    {
        id: 3,
        text: 'Voitit pelin',
        options: [
            {
                text: 'JEEE!!!'
            }
        ]
    }
]

startGame()