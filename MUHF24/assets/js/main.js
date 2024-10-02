const membersContainer = document.getElementById("members");
const leadsContainer = document.getElementById("leads");
import { members, leads } from "./membersData.js";

function createCard(item, isLead = false) {
  return `
    <div class="swiper-slide card">
      <div class="card-content">
        <div class="image">
          <img src="${item.src}"  alt="${item.alt}" />
        </div>
        ${
          isLead
            ? `
        <div class="media-icons">
          <i class="fa-brands fa-facebook" href="${item.facebook}"></i>
          <i class="fa-brands fa-square-x-twitter" href="${item.twitter}"></i>
          <i class="fa-brands fa-linkedin" href="${item.linkedin}"></i>
          <i class="fa-brands fa-github" href="${item.github}"></i>
        </div>
        `
            : ""
        }
        <div class="name-profession">
          <span class="name">${item.name}</span>
          <span class="profession">${item.profession}</span>
        </div>
      </div>
    </div>
  `;
}

// Iterate over the leadsData array and create a card for each lead
leads.forEach((lead) => {
  leadsContainer.innerHTML += createCard(lead, true);
});

// Iterate over the membersData array and create a card for each member
members.forEach((member) => {
  membersContainer.innerHTML += createCard(member);
});
