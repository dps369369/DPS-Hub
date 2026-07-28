const projectContainer = document.getElementById("project-container");


fetch("../data/projects.json")

    .then(response => response.json())

    .then(projects => {


        projects.forEach(project => {


            const projectCard = document.createElement("article");


            projectCard.classList.add("project-card");



            projectCard.innerHTML = `

                <img 
                    src="${project.image}" 
                    alt="${project.title}"
                >



                <h3>
                    ${project.title}
                </h3>



                <p>
                    ${project.description}
                </p>



                <div class="project-info">


                    <span>
                        Status: ${project.status}
                    </span>



                    <span>
                        Started: ${project.started}
                    </span>



                    <span>
                        ${
                            project.ended
                            ? `Ended: ${project.ended}`
                            : "End Date: Ongoing"
                        }
                    </span>


                </div>



                <a 
                    href="${project.link}"
                    class="btn primary-btn"
                    target="_blank"
                >

                    View Project

                </a>


            `;



            projectContainer.appendChild(projectCard);


        });


    })


    .catch(error => {

        console.error("Error loading projects:", error);

    });