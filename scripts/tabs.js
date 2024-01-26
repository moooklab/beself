class Tabs {

    constructor(section, captions, contents) {
        this.section = section
        this.captions = captions
        this.contents = contents

        this.captions.forEach( (caption, index) => {
            caption.addEventListener('click', event => {
                this.resetAll()
                this.onClick(index)
            })
        })
    }

    onClick(index) {
        this.captions[index].classList.add('active')
        this.contents[index].classList.add('active')
    }

    resetAll(){
        this.captions.forEach( caption => caption.classList.remove('active'))
        this.contents.forEach( content => content.classList.remove('active'))
    }

}

tabsSections = document.querySelectorAll('div.tabs')
tabsSections.forEach( tabSection => {
    captions = tabSection.querySelectorAll('.tab_caption')
    contents = tabSection.querySelectorAll('.tab_content')
    tab = new Tabs(tabSection, captions, contents)
})