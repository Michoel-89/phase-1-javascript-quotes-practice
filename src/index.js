const includeLikesRequest = 'http://localhost:3000/quotes?_embed=likes'
fetch(includeLikesRequest)
.then(resp => resp.json())
.then((quotes) => {
    quotes.forEach(quote => {
        renderQuotes(quote)
        console.log(quote)
    });
})
const quoteList = document.querySelector('#quote-list')
function renderQuotes(quote) {
    const li = document.createElement('li')
    li.classList.add('quote-card')
    const blockquote = document.createElement('blockquote')
    blockquote.classList.add('blockquote')
    const p = document.createElement('p')
    p.classList.add('mb-0')
    p.textContent = quote.quote
    const footer = document.createElement('footer')
    footer.classList.add('blockquote-footer')
    footer.textContent = quote.author
    const br = document.createElement('br')
    const button = document.createElement('button')
    button.classList.add('btn-success')
    const span = document.createElement('span')
    span.textContent = '0'
    button.textContent = 'Likes: '
    button.append(span)
    const button2 = document.createElement('button')
    button2.classList.add('btn-danger')
    button2.textContent = 'Delete'
    button2.setAttribute('id', `${quote.id}`)
    button.appendChild(span)
    quoteList.appendChild(li).append(blockquote, p, footer, br, button, button2)
    button2.addEventListener('click', () => {
        button2.parentNode.remove()
        fetch(`http://localhost:3000/quotes/${button2.getAttribute('id')}`, {
            "method": "DELETE",
            "headers": {
              "Content-Type": "application/json",
            },
          }
          )
          .then(resp => resp)
          .then(data => data)
    })
    button.addEventListener('click', () => {
        let currentNum = button.querySelector('span').textContent
        button.querySelector('span').textContent = Number(currentNum) + 1 
    })
}
const form = document.querySelector('form')
form.addEventListener('submit', (e) => {
    e.preventDefault()
    let quote = {
        quote: e.target[0].value,
        author: e.target[1].value
    }
    fetch('http://localhost:3000/quotes', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(quote)
})
  .then(response => response.json())
  .then(data => {
    // Handle the response data
    renderQuotes(data)
  })
  .catch(error => {
    // Handle any errors
    console.error('Error:', error);
  });

})
