// All news 
const url='https://openapi.programming-hero.com/api/news/categories'
  fetch(url)
  .then(req=>req.json())
  .then(allnews=>allNewsCata(allnews.data.news_category))
  .catch(error=>console.log(error))

const allNewsCata = allnews=>{
  for(let eachNewsCat of allnews){
    const ul1=document.getElementById('ul1');
    const li=document.createElement('li');
    li.classList.add('nav-item');
    li.innerHTML=`
    <a class="nav-link" href="#" id="${eachNewsCat.category_id}" onclick="eachButton('${eachNewsCat.category_id}','${eachNewsCat.category_name}')">${eachNewsCat.category_name}</a>
    `
    ul1.appendChild(li);
  }
}
function eachButton(id,category_name){
  const idurl=`https://openapi.programming-hero.com/api/news/category/${id}`
  fetch(idurl)
  .then(req1=>req1.json())
  .then(eachNews=>eachNewsPortal(eachNews.data,category_name))
}

const eachNewsPortal= (eachNews,category_name)=>{
  isLoding(true);
  const footer=document.getElementById('footer');
  // Take Found 
  const found=document.getElementById('found');
  found.innerHTML=`
  <h4>${eachNews.length?eachNews.length:' "No News Found "'} items found for category ${category_name}</h4>`

  if(eachNews.length== 0){
    footer.classList.add('d-none');
  }
  else{
    footer.classList.remove('d-none')
  }
  const newShow=document.getElementById('newShow');
  newShow.innerHTML='';
  eachNews.forEach(eachNewshow=>{
  const div=document.createElement('div');
  const newShow=document.getElementById('newShow');
  div.innerHTML=`
  <div class="card mb-3" style="max-width:100%;">
    <div class="row g-0">
      <div class="col-lg-4 col-md-4 col-sm-12">
         <img src="${eachNewshow.thumbnail_url}" class="img-fluid p-4" alt="...">
      </div>
      <div class="col-lg-8 col-md-8 col-sm-12">
        <div class="card-body">
        <h5 class="card-title text-black mt-5">${eachNewshow.title}</h5> 
          <p class="card-text">${eachNewshow.details.slice(1,350)}.....</p>
          <div class="comma-star d-flex justify-content-between mt-3">
              <div class="comma">
                <div class="feedback d-flex gap-3">
                  <div class="img-t">
                    <img style="height:50px;width: 50px;" class="image-fluid border rounded-circle"  src="${eachNewshow.author.img}" alt="">
                  </div>
                  <div class="name-d">
                    <p><span class="fw-bold">${eachNewshow.author.name?eachNewshow.author.name:'No Data Available'}</span><span class="d-block fdasig">${eachNewshow.author.published_date?eachNewshow.author.published_date:'No Data Available'}</span></p>
                  </div>
                </div>
              </div>
              <div>
              <i class="fa-regular fa-eye me-2"></i>
              <i class="fs-5 fs-bold fw-bold">${eachNewshow.total_view?eachNewshow.total_view:'No Data Available'}</i>
              </div>
              <div class="star text-warning">
                <i>${eachNewshow.rating.number?eachNewshow.rating.number:'No Data Available'}</i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star-of-david"></i> 
              </div>
              <div>
              <!-- Button trigger modal -->
              <button  type="button" class="btn btn-info" onclick="moreDetails('${eachNewshow._id}')" data-bs-toggle="modal" data-bs-target="#exampleModal">More Details</button>
              </div>
           </div>
      </div>
      </div>
    </div>
  </div>`
  newShow.appendChild(div);
  });
  isLoding(false);
}




function moreDetails(clickId){
  const url2=`https://openapi.programming-hero.com/api/news/${clickId}`
  fetch(url2)
  .then(req=>req.json())
  .then(datas=>modalShow(datas.data))
}
function modalShow(datas){
  for(const data of datas){
    const exampleModalLabel=document.getElementById('exampleModalLabel');
    exampleModalLabel.innerHTML=`
    <h5 class="text-danger"><span class="ps-1 pe-1 border rounded-2 bg-dark text-light">Title :</span> ${data.title} .</h5>`
    //modal Body part
    const modalId=document.getElementById('modalId');
    modalId.innerHTML=`
    <p>${data.details}</p>
    <div class="text-center w-100" >
    <img src="${data.thumbnail_url}">
    </div>
    `
    console.log(data);
}
}

function isLoding(isloding){
  const spiner=document.getElementById('spiner');
  if(isloding){
    spiner.classList.remove('d-none');
  }
  else{
    spiner.classList.add('d-none');

  }
}