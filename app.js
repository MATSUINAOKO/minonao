window.addEventListener("load", () => {
  // This is a check to see if there's a username stored
  let username = localStorage.getItem("username");
  document.querySelector("#logout").addEventListener("click", function () { clearData() });
  // document.querySelector("#post-button").addEventListener("click", function () {
  //   let hashContent = document.querySelector("#hashtag").value;
  //   let feelContent = document.querySelector("#feeling").value;
  //   let textContent = document.querySelector("#usertext").value;
  //   const containerEl = document.querySelector("#displayArea");
  //   containerEl.innerText = `${hashContent} + ${feelContent} + ${textContent}`;
  // });

  if (!username) {
    /* Prompt for one if a username isn't found
    ユーザー名が見つからない場合は入力を求めるプロンプトを表示する
    */
    username = window.prompt("What is your name?");
    localStorage.setItem("username", username);       //localStorageに"username"で保存
    window.location.reload();

  } else {
    const localStorageElement = document.querySelector("#name");
    localStorageElement.innerText = `( ${username} )`;
  }
  // if (!username) {
  //   // Prompt for one if a username isn't found
  //   username = window.prompt("What is your name?");
  //   localStorage.setItem("username", username);
  // }
  document.querySelector("#post-button").addEventListener("click", function () {
    let hashContent = document.querySelector("#hashtag").value;
    let feelContent = document.querySelector("#feeling").value;
    let textContent = document.querySelector("#usertext").value;
    let dateTi = new Date();
    const addText = {
      friend: username,
      text: `${textContent} ${hashContent}`,
      feeling: feelContent,
      image: "/Users/user/Desktop/precourse.bacefook-dig/images/tired.jpg",
      timestamp: dateTi
    };
    //let len = bacefook.newsfeed.length;
    //bacefook.newsfeed[len] = addText;
    //bacefook.newsfeed.unshift(addText);
    //feed();
    //window.location.reload();
    // ***********************************
    const containerEl = document.querySelector("#newsfeed");
    const friendEl = document.createElement("div");
    // friendEl.className = "fcard-riend";
    friendEl.innerText = addText.friend;

    const postEl = document.createElement("div");
    postEl.innerText = addText.text;
    // postEl.className = "card-post";
    postEl.append(friendEl);

    const feelingEl = document.createElement("div");
    feelingEl.innerText = addText.feeling;
    // feelingEl.className = "card-feeling";
    feelingEl.append(postEl);

    // const dateTimeEl = document.createElement("div");
    // dateTimeEl.innerText = post.timestamp;
    // dateTimeEl.classname = "card-datetime";
    // feelingEl.append(dateTimeEl);

    const dateTimeEl = document.createElement("div");
    let dateTo = moment(addText.timestamp);
    let dateFrom = moment();
    let dateTime = 0;
    console.log(addText.timestamp);
    if (dateFrom.diff(dateTo) >= (24 * 60 * 60 * 1000)) {
      dateTime = `posted ${dateFrom.diff(dateTo, 'days')} days ago`;
    } else if (dateFrom.diff(dateTo) >= (60 * 60 * 1000)) {
      dateTime = `posted ${dateFrom.diff(dateTo, 'hours')} hours ago`;
    } else {
      dateTime = `posted ${dateFrom.diff(dateTo, 'minutes')} minutes ago`;
    }

    dateTimeEl.innerText = dateTime;
    dateTimeEl.classname = "card-datetime";
    feelingEl.append(dateTimeEl);

    const imageEl = document.createElement("img");
    imageEl.src = addText.image;
    imageEl.width = "500";
    imageEl.className = "card-img";

    const blockEl = document.createElement("hr");
    const cardContainer = document.createElement("div")
    cardContainer.className = "cardContainer";
    // cardContainer.append(dateTimeEl);

    containerEl.prepend(blockEl);
    cardContainer.prepend(feelingEl);
    cardContainer.prepend(imageEl);

    containerEl.prepend(cardContainer);
    //containerEl.append(dateTimeEl);
    // containerEl.append(imageEl);

    //***************************

  });
  // console.log(bacefook.newsfeed)
  feed();
});



function feed() {
  //console.log(bacefook.newsfeed)
  const containerEl = document.querySelector("#newsfeed");
  // This makes things appear
  for (let index = bacefook.newsfeed.length - 1; index >= 0; index--) {
    const post = bacefook.newsfeed[index];
    // console.log(`post: ${bacefook.newsfeed[index]} index: ${index}`);

    // const cardEl = document.createElement("card");
    // cardEl.classname = "card"

    // const friendEl=document.createTextNode(post.friend)
    // cardEl.appendChild(friendEl);

    // containerEl.append(cardEl);



    const friendEl = document.createElement("div");
    // friendEl.className = "fcard-riend";
    friendEl.innerText = post.friend;

    const postEl = document.createElement("div");
    postEl.innerText = post.text;
    // postEl.className = "card-post";
    postEl.append(friendEl);

    const feelingEl = document.createElement("div");
    feelingEl.innerText = post.feeling;
    // feelingEl.className = "card-feeling";
    feelingEl.append(postEl);

    // const dateTimeEl = document.createElement("div");
    // dateTimeEl.innerText = post.timestamp;
    // dateTimeEl.classname = "card-datetime";
    // feelingEl.append(dateTimeEl);

    const dateTimeEl = document.createElement("div");
    let dateTo = moment(post.timestamp);
    let dateFrom = moment();
    let dateTime = 0;
    console.log(post.timestamp);
    if (dateFrom.diff(dateTo) >= (24 * 60 * 60 * 1000)) {
      dateTime = `posted ${dateFrom.diff(dateTo, 'days')} days ago`;
    } else if (dateFrom.diff(dateTo) >= (60 * 60 * 1000)) {
      dateTime = `posted ${dateFrom.diff(dateTo, 'hours')} hours ago`;
    } else {
      dateTime = `posted ${dateFrom.diff(dateTo, 'minutes')} minutes ago`;
    }





    dateTimeEl.innerText = dateTime;
    dateTimeEl.classname = "card-datetime";
    feelingEl.append(dateTimeEl);

    const imageEl = document.createElement("img");
    imageEl.src = post.image;
    imageEl.width = "500";
    imageEl.className = "card-img";

    const blockEl = document.createElement("hr");
    const cardContainer = document.createElement("div")
    cardContainer.className = "cardContainer";
    // cardContainer.append(dateTimeEl);

    cardContainer.append(imageEl);
    cardContainer.append(feelingEl);

    containerEl.append(cardContainer);
    // containerEl.append(dateTimeEl);
    // containerEl.append(imageEl);
    containerEl.append(blockEl);
  }
  return;
};



// let m = moment();
// let output = m.format('YYYY年MMM月DD日 HH:mm:ss dddd');
// console.log(output);

// // let dateTo = moment('2023-10-10 12:00:00');
// // let dateFrom = moment();

// // ミリ秒を返します
// dateFrom.diff(dateTo)  // 7884000000
// dateFrom.diff(dateTo) / (24 * 60 * 60 * 1000)  // 91.25

// // 第2引数で単位を指定できます。
// dateFrom.diff(dateTo, 'months')   // 3
// dateFrom.diff(dateTo, 'days')     // 91
// dateFrom.diff(dateTo, 'hours')    // 2190

// // 第3引数で小数の調整ができます。
// dateFrom.diff(dateTo, 'days', true)  // 91.25
// dateFrom.diff(dateTo, 'days', false) // 91

// console.log(dateFrom.diff(dateTo));
// console.log(dateFrom.diff(dateTo, 'days'));
// console.log(dateFrom.diff(dateTo, 'hours'));
// console.log(moment().startOf('hour').fromNow());
// console.log(dateFrom.diff(dateTo, 'minutes'));
//});

const clearData = () => {
  localStorage.removeItem("username");
  alert("ログアウトしました！！");
  window.location.reload();
  return;
}

// const post = () => {
//   let hashContent = document.querySelector("#hashtag").value;
//   let feelContent = document.querySelector("#feeling").value;
//   let textContent = document.querySelector("#usertext").value;
//   let dateTime = moment();
//   const addText = {
//     friend: username,
//     text: `${textContent} ${hashContent}`,
//     feeling: feelContent,
//     timestamp: dateTime
//   };
//   bacefook.newsfeed.push(addText);
//   window.location.reload();
//   return bacefook.newsfeed;
// }
