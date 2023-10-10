window.addEventListener("load", () => {
  // This is a check to see if there's a username stored
  let username = localStorage.getItem("username");
  document.querySelector("#logout").addEventListener("click", function () { clearData() });

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

  const containerEl = document.querySelector("#newsfeed");

  // This makes things appear
  for (let index = bacefook.newsfeed.length - 1; index >= 0; index--) {
    const post = bacefook.newsfeed[index];

    // const cardEl = document.createElement("card");
    // cardEl.classname = "card"

    // const friendEl=document.createTextNode(post.friend)
    // cardEl.appendChild(friendEl);

    // containerEl.append(cardEl);


    const friendEl = document.createElement("div");
    friendEl.className = "fcard-riend";
    friendEl.innerText = post.friend;

    const postEl = document.createElement("div");
    postEl.innerText = post.text;
    postEl.className = "card-post";
    postEl.append(friendEl);

    const feelingEl = document.createElement("div");
    feelingEl.innerText = post.feeling;
    feelingEl.className = "card-feeling";
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
});

const clearData = () => {
  localStorage.removeItem("username");
  alert("ログアウトしました！！");
  window.location.reload();
  return;
}
