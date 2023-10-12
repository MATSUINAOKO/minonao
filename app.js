window.addEventListener("load", () => {
  // This is a check to see if there's a username stored
  let username = localStorage.getItem("username");
  document.querySelector("#logout").addEventListener("click", function () {
    clearData();
  });
  if (!username) {
    /* Prompt for one if a username isn't found
    ユーザー名が見つからない場合は入力を求めるプロンプトを表示する
    */
    username = window.prompt("What is your name?");
    localStorage.setItem("username", username); //localStorageに"username"で保存
    window.location.reload();
  } else {
    const localStorageElement = document.querySelector("#name");
    localStorageElement.innerText = `( ${username} )`;
  }
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
      timestamp: dateTi,
    };
    const addTextData = addText;
    const addTextJSONData = JSON.stringify(addTextData);
    window.localStorage.setItem("newPost", addTextJSONData);
    window.location.reload();
  });
  if (
    JSON.parse(window.localStorage.getItem("newPost") !== "[object Object]")
  ) {
    const storagPost = JSON.parse(window.localStorage.getItem("newPost"));
    if (storagPost !== null) {
      bacefook.newsfeed.push(storagPost);
    }
  }
  //console.log(bacefook)
  console.log(`前：　${bacefook.newsfeed[10].timestamp}`);
  console.log(bacefook);
  sort(bacefook);
  // bacefook.newsfeed.sort((a, b) => (a.timestamp) - (b.timestamp));
  //bacefook.newsfeed.sort((a, b) => (a.timestamp.getTime()) - (b.timestamp.getTime()));
  console.log(`あと：　${bacefook.newsfeed[10].timestamp}`);
  console.log(bacefook);
  feed(bacefook);
});

function feed(array) {
  console.log(array, Object.keys(array.newsfeed).length); //lengthの値と実際のオブジェクトレングスの値が違う？
  const containerEl = document.querySelector("#newsfeed");
  let post = [];
  for (let index = array.newsfeed.length - 1; index >= 0; index--) {
    post = array.newsfeed[index];
    console.log(post);
    newFeed(post);
  }
  return;
}

///////////////////////////////////////////////////////////
function newFeed(textEl) {
  const containerEl = document.querySelector("#newsfeed");
  const friendEl = document.createElement("div");
  friendEl.innerText = textEl.friend;

  const postEl = document.createElement("div");
  postEl.innerText = textEl.text;
  postEl.append(friendEl);

  const feelingEl = document.createElement("div");
  feelingEl.innerText = textEl.feeling;
  feelingEl.append(postEl);

  const dateTimeEl = document.createElement("div");
  let dateTo = moment(textEl.timestamp);
  let dateFrom = moment();
  let dateTime = 0;
  if (dateFrom.diff(dateTo) >= 24 * 60 * 60 * 1000) {
    dateTime = `posted ${dateFrom.diff(dateTo, "days")} days ago`;
  } else if (dateFrom.diff(dateTo) >= 60 * 60 * 1000) {
    dateTime = `posted ${dateFrom.diff(dateTo, "hours")} hours ago`;
  } else {
    dateTime = `posted ${dateFrom.diff(dateTo, "minutes")} minutes ago`;
  }

  dateTimeEl.innerText = dateTime;
  dateTimeEl.classname = "card-datetime";
  feelingEl.append(dateTimeEl);

  const imageEl = document.createElement("img");
  imageEl.src = textEl.image;
  imageEl.width = "500";
  imageEl.className = "card-img";

  const blockEl = document.createElement("hr");
  const cardContainer = document.createElement("div");
  cardContainer.className = "cardContainer";
  //////Facebookアイコン/
  const snsUl_F = document.createElement("ul");
  snsUl_F.className = "fas_sns_circlecolor";
  const snsList_F = document.createElement("li");
  const snsA_F = document.createElement("a");
  snsA_F.href =
    "https://www.facebook.com/campaign/landing.php?campaign_id=1665596389&extra_1=s%7Cc%7C321610682127%7Ce%7Cfacebook%20%E3%83%AD%E3%82%B0%E3%82%A4%E3%83%B3%7C&placement=&creative=321610682127&keyword=facebook%20%E3%83%AD%E3%82%B0%E3%82%A4%E3%83%B3&partner_id=googlesem&extra_2=campaignid%3D1665596389%26adgroupid%3D65075436380%26matchtype%3De%26network%3Dg%26source%3Dnotmobile%26search_or_content%3Ds%26device%3Dc%26devicemodel%3D%26adposition%3D%26target%3D%26targetid%3Dkwd-309772192975%26loc_physical_ms%3D9174413%26loc_interest_ms%3D%26feeditemid%3D%26param1%3D%26param2%3D&gclid=Cj0KCQjwj5mpBhDJARIsAOVjBdrQI4T02OjdDUXhQnWT7l_TFwmpky_biIW9DmMOb1aBkoTsyifM3FIaAnYaEALw_wcB";
  snsA_F.target = "_blank";
  snsA_F.rel = "nofollow";
  snsA_F.alt = "facebook";
  const snsI_F = document.createElement("i");
  snsI_F.className = "fab fa-facebook-square";

  snsA_F.append(snsI_F);
  snsList_F.append(snsA_F);
  snsUl_F.append(snsList_F);

  //////
  //////Lineアイコン/
  const snsUl_L = document.createElement("ul");
  snsUl_L.className = "fas_sns_circlecolor";
  const snsList_L = document.createElement("li");
  const snsA_L = document.createElement("a");
  snsA_L.href = "http://line.me/R/msg/text/?{URL}";
  snsA_L.target = "_blank";
  snsA_L.rel = "nofollow";
  snsA_L.alt = "Line";
  const snsI_L = document.createElement("i");
  snsI_L.className = "fab fa-line";

  snsA_L.append(snsI_L);
  snsList_L.append(snsA_L);
  snsUl_F.append(snsList_L);

  //////インスタアイコン/
  const snsUl_I = document.createElement("ul");
  snsUl_I.className = "fas_sns_circlecolor";
  const snsList_I = document.createElement("li");
  const snsA_I = document.createElement("a");
  snsA_I.href = "https://www.instagram.com/";
  snsA_I.target = "_blank";
  snsA_I.rel = "nofollow";
  snsA_I.alt = "Instagram";
  const snsI_I = document.createElement("i");
  snsI_I.className = "fab fa-instagram";

  snsA_I.append(snsI_I);
  snsList_I.append(snsA_I);
  snsUl_F.append(snsList_I);

  feelingEl.append(snsUl_F);
  //////
  /////
  // containerEl.append(snsUl);
  ////
  cardContainer.append(imageEl);
  cardContainer.append(feelingEl);
  containerEl.append(cardContainer);

  containerEl.append(blockEl);
  return;
}
////////////////////////////////////////////////////

const clearData = () => {
  localStorage.removeItem("username");
  alert("ログアウトしました！！");
  window.location.reload();
  return;
};

function sort(arr) {
  //*************　挿入ソート
  const sortResult = arr;
  let tmp = 0;
  let j = 0;
  for (let i = 1; i < sortResult.newsfeed.length; i++) {
    tmp = sortResult.newsfeed[i].timestamp;
    for (j = i - 1; j >= 0; j--) {
      if (tmp > sortResult.newsfeed[j].timestamp) {
        break;
      } else {
        sortResult.newsfeed[j + 1].timestamp = sortResult.newsfeed[j].timestamp;
      }
    }
    sortResult.newsfeed[j + 1].timestamp = tmp;
  }
  return sortResult;
}
