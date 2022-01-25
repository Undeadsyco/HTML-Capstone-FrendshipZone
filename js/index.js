const btn = document.getElementById('search');
const tBody = document.getElementById('tableBody');
const form = document.forms[0];
console.log(form);

window.addEventListener('load', function (event) {
  getData()
});

// function to create row for each user and add the appropriate
// columns in each row before appending them to the table
function getData() {
  try {
    if (tBody) {
      fetch('data/db.json').then(function (res) {
        return res.json()
      }).then(function (data) {
        data.users.forEach(function (item) {
          const row = document.createElement('tr');

          const name = document.createElement('td');
          const nameContent = document.createTextNode(item.name);
          name.appendChild(nameContent);

          const about = document.createElement('td');
          const aboutContect = document.createTextNode(item.about);
          about.appendChild(aboutContect);

          const request = document.createElement('td');
          const friendBtn = document.createElement('button');
          const friendBtnContent = document.createTextNode('Friendship');
          friendBtn.appendChild(friendBtnContent);
          const datingBtn = document.createElement('button');
          const datingBtnContent = document.createTextNode('Dating');
          datingBtn.appendChild(datingBtnContent);
          request.appendChild(friendBtn);
          request.appendChild(datingBtn);

          const contact = document.createElement('td');
          const number = document.createElement('p');
          const numberContent = document.createTextNode(item.number);
          number.appendChild(numberContent);
          const email = document.createElement('p');
          const emailContent = document.createTextNode(item.email);
          email.appendChild(emailContent);

          contact.appendChild(number);
          contact.appendChild(email);

          row.appendChild(name);
          row.appendChild(about);
          row.appendChild(request);
          row.appendChild(contact);

          tBody.append(row)
        });
      })
    }
  } catch (error) {
    console.log(error.message)
  }
}


const submitBtn = form[8];
submitBtn.addEventListener('click', function(e) {
  e.preventDefault();
  registrationSubmit();
})
// function to handle registration
async function registrationSubmit() {
  const body = {
    name: form[0].value,
    email: form[1].value,
    number: form[2].value,
    age: form[3].value,
    dob: form[6].value,
    about: form[7].value
  };

  if (form[4].checked) body.gender = form[4].value;
  if (form[5].checked) body.gender = form[5].value;

  const req = await fetch('http://localhost:5000/users');
  const users = await req.json();
  console.log(users);

  fetch('http://localhost:5000/users', {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json'
    },
    referrerPolicy: 'no-referrer',
    body: JSON.stringify({ id: users.length + 1, ...body})
  }).then(function(res) {
    return res.json()
  }).then(function(data) {
    window.location.assign('http://127.0.0.1:5500//user-confirmation.html')
  })
}