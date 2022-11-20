document.getElementById('addCard').addEventListener('click', function(e) {
  console.log(localStorage)
  darkScreen()
  whiteBlock('90vh', '56vw')
  const titleBlock = document.createElement('div')
  titleBlock.id = 'titleBox'

  const titleCard = document.createElement('input')
  titleCard.id = 'titleCard'
  titleCard.style.fontSize = '25px'

  titleBlock.append(titleCard)
  document.getElementById('whiteblk').appendChild(titleBlock)
  const whiteCard = document.getElementById('whiteblk')

  const card = document.createElement('div')
  whiteCard.appendChild(card)

  newRow(card)
  createButtons(whiteCard, card)
})

function newRow(card, item) {
  const row = document.createElement('div')
  row.classList.add('cardRow')
  row.style.marginBottom = '10px'

  const questionField = document.createElement('textarea')
  try {
      questionField.value = item.Question
  } catch {}
  questionField.style.marginRight = '10px'

  const answerField = document.createElement('textarea')
  try {
      answerField.value = item.Answer
  } catch {}

  row.appendChild(questionField)
  row.appendChild(answerField)
  card.append(row)
}

function createButtons(whiteCard, card) {
  const addCard = document.createElement('div')
  addCard.id = 'addCard'

  const buttonRow = document.createElement('div')
  buttonRow.id = 'buttonRow'

  const addButton = document.createElement('button')
  addButton.style.margin = '10px'
  addButton.style.width = '35vw'
  addButton.textContent = '+'

  const cancelButton = document.createElement('button')
  cancelButton.textContent = 'Cancel'

  const confirmButton = document.createElement('button')
  confirmButton.id = 'confirmButton'
  confirmButton.textContent = 'Confirm'

  //confirm button event
  confirmButton.addEventListener('click', function(e) {
      var editTitle = document.getElementById('titleCard').value;
      console.log(editTitle)
      var wholeObject = {
          "classification": "SRSFlashCards",
          "title": editTitle
      }
      var cardArray = []
      const rowList = document.getElementsByClassName('cardRow')

      for (var y = 0; y < rowList.length; y++) {

          let cardObject = {
              "Question": rowList[y].children[0].value,
              "Answer": rowList[y].children[1].value
          }

          cardArray.push(cardObject)
      }

      console.log(wholeObject)
      wholeObject.set = cardArray
      wholeObject = JSON.stringify(wholeObject);

      localStorage.setItem(editTitle, wholeObject)

      document.getElementById('blkPage').remove()
      document.getElementById('whiteblk').remove()
      location.reload();
  })

  addButton.addEventListener('click', function(e) {
      newRow(card)
  })

  cancelButton.addEventListener('click', function(e) {
      document.getElementById('blkPage').remove()
      document.getElementById('whiteblk').remove()
  })

  addCard.appendChild(addButton)
  buttonRow.appendChild(cancelButton)
  buttonRow.appendChild(confirmButton)

  whiteCard.appendChild(addCard)
  whiteCard.appendChild(buttonRow)
}

function allStorage() {
  var archive = [],
      keys = Object.keys(localStorage),
      i = 0,
      key;

  for (; key = keys[i]; i++) {
      archive.push(localStorage.getItem(key));
  }

  return archive;
}

function refreshItems(){
  container.innerHTML = ''
  for (var x = 0; x < localItems.length; x++) {
    try {
        var item = JSON.parse(localItems[x])
        console.log(item.classification)
        if (item.classification == "SRSFlashCards") {
            console.log(item.set.length)
  
            //setting of buttons
            const itemBody = document.createElement('div');
            itemBody.textContent = item.title;
            itemBody.classList.add('itemList')
            container.appendChild(itemBody)
  
            const buttonContainer = document.createElement('div')
            buttonContainer.classList.add('buttonContainer')
            itemBody.appendChild(buttonContainer)
  
            const goButton = document.createElement('button')
            goButton.textContent = 'Go'
            goButton.id = item.title;
            goButton.addEventListener('click', function(e){
              localStorage.setItem('Queue', this.id)
              window.location.href = '/HtmlFiles/test.html'
            })

            const editButton = document.createElement('button')
            editButton.textContent = 'edit'
            editButton.style.marginLeft = '7px'
  
            //editButton function
            editButton.addEventListener('click', function(e) {
                console.log(localStorage)
                darkScreen()
                whiteBlock('90vh', '56vw', 'editContentBlock')
  
                const titleBlock = document.createElement('div')
                titleBlock.id = 'titleBox'
  
                const titleCard = document.createElement('input')
                titleCard.id = 'titleCard'
                titleCard.value = item.title
                titleCard.style.fontSize = '25px'
  
                titleBlock.append(titleCard)
                document.getElementById('whiteblk').appendChild(titleBlock)
  
                const whiteCard = document.getElementById('whiteblk')
  
                const card = document.createElement('div')
                whiteCard.appendChild(card)
  
                createButtons(whiteCard, card)
  
                console.log(item)
  
                for (var y = 0; y < item.set.length; y++) {
                    newRow(card, item.set[y])
                }
            })
  
            const removeButton = document.createElement('button')
            removeButton.textContent = 'remove'
            removeButton.style.marginLeft = '7px'
            removeButton.id = item.title
            removeButton.addEventListener('click', function(e){
              localStorage.removeItem(this.id)
              location.reload()
            })
            
            buttonContainer.appendChild(goButton)
            buttonContainer.appendChild(editButton)
            buttonContainer.appendChild(removeButton)
        }
    } catch (err) {
  
    }
  }
}

function darkScreen() {
  const blackPanel = document.createElement('div')
  blackPanel.id = 'blkPage'
  document.body.insertBefore(blackPanel, document.body.firstChild)

}

function whiteBlock(height, width) {
  const whiteBlock = document.createElement('div')
  whiteBlock.style.width = width
  whiteBlock.style.height = height
  whiteBlock.style.right = '21vw'
  whiteBlock.id = 'whiteblk'
  whiteBlock.classList.add('whiteBlock')
  document.body.insertBefore(whiteBlock, document.body.firstChild)
}

var localItems = allStorage();
const container = document.getElementById('Content');
const header = document.getElementById('Header');
console.log(localItems.length)
refreshItems()