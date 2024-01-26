// Range Слайдер

var numberInputs = document.querySelectorAll('div.range input[type=number]')
var rangeInputs = document.querySelectorAll('div.range input[type=range]')
var track = document.querySelector('div.range div.track')


rangeInputs[0]?.addEventListener('input', element => {
    if( rangeInputs[1].value - rangeInputs[0].value >= 0 ) {
        numberInputs[0].value = element.target.value
    } else {
        rangeInputs[0].value = rangeInputs[1].value
    }

    fillTrack()
})

rangeInputs[1]?.addEventListener('input', element => {
    if( rangeInputs[1].value - rangeInputs[0].value >= 0 ) {
        numberInputs[1].value = element.target.value
    } else {
        rangeInputs[1].value = rangeInputs[0].value
    }

    fillTrack()
})

numberInputs[0]?.addEventListener('change', element => {
    if( numberInputs[1].value - numberInputs[0].value >= 0 ) {
        rangeInputs[0].value = element.target.value
    } else {
        numberInputs[0].value = numberInputs[1].value
        rangeInputs[0].value = element.target.value
    }

    if( parseInt(numberInputs[0].value) < rangeInputs[0].getAttribute('min') ) {
        numberInputs[0].value = rangeInputs[0].getAttribute('min')
    }

    fillTrack()
})

numberInputs[1]?.addEventListener('change', element => {
    // Если максимальное число
    if( numberInputs[1].value - numberInputs[0].value >= 0 ) {
        rangeInputs[1].value = element.target.value
    } else {
        numberInputs[1].value = numberInputs[0].value
        rangeInputs[1].value = numberInputs[0].value
    }
    
    if( parseInt(numberInputs[1].value) > rangeInputs[0].getAttribute('max') ) {
        numberInputs[1].value = rangeInputs[0].getAttribute('max')
    }

    fillTrack()
})


function fillTrack () {
    maxRange = rangeInputs[0].getAttribute('max')
    var firstPercentage = (rangeInputs[0].value / maxRange) * 100
    var secondPercentage = (rangeInputs[1].value / maxRange) * 100
    var gradient = 'linear-gradient(to right, #E4E5E5 ' + firstPercentage + '%, #00AB4B ' + firstPercentage + '%, #00AB4B ' + secondPercentage + '%, #E4E5E5 ' + secondPercentage + '%)'
    track.style.left = firstPercentage + '%'
    track.style.width = (secondPercentage - firstPercentage) + '%'
}

// fillTrack()