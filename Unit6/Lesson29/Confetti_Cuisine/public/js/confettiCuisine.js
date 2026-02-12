$(document).ready(() => {
  $("#modal-button").click(() => {
    $(".modal-body").html("");
    $.get(`/api/courses`, (results = {}) => {
      let data = results.data;
      if (!data || !data.courses) return;
      data.courses.forEach(course => {
        $(".modal-body").append(
          `<div>
						<span class="course-title">
							${course.title}
						</span>
						<span class="course-cost">$${course.cost}</span>
						<button class="${course.joined ? "joined-button" : "join-button"} btn btn-info btn-sm" data-id="${course._id}">
							${course.joined ? "Joined" : "Join"}
						</button>
						<div class="course-description">
							${course.description}
						</div>
					</div>`
        );
      });
    }).then(() => {
      addJoinButtonListener();
    });
  });
});

let addJoinButtonListener = () => {
  $(".join-button").click(event => {
    let $button = $(event.target),
      courseId = $button.data("id");
			console.log(`/api/courses/${courseId}/join`)
    $.get(`/api/courses/${courseId}/join`, (results = {}) => {
      let data = results.data;
      if (data && data.success) {
        $button
          .text("Joined")
          .addClass("joined-button")
          .removeClass("join-button");
      } else {
        $button.text("Try again");
      }
    });
  });
};

// Code Summary

// This jQuery script handles displaying available courses in a modal and allowing users to join them.

// 1. When the page loads

// The code runs inside $(document).ready(), ensuring the DOM is fully loaded before attaching event listeners.

// 2. When the modal button is clicked

// Clicking #modal-button:

// Clears the .modal-body content.

// Sends a GET request to /api/courses to retrieve course data.

// Checks if the response contains valid course data.

// Iterates through data.courses and dynamically appends HTML for each course to .modal-body.

// Each course entry includes:

// Course title

// Course cost

// A button:

// Displays "Join" if the user hasn’t joined.

// Displays "Joined" if already joined.

// Uses conditional classes (join-button or joined-button).

// Course description

// After the courses are added to the DOM, addJoinButtonListener() is called.

// 3. Handling the "Join" button

// addJoinButtonListener():

// Attaches a click event listener to all elements with class .join-button.

// When clicked:

// Retrieves the course ID from the button’s data-id.

// Sends a GET request to /api/courses/{courseId}/join.

// If the response indicates success:

// Changes button text to "Joined"

// Replaces class join-button with joined-button

// If unsuccessful:

// Changes button text to "Try again"

// Overall Functionality

// This script:

// Dynamically loads courses into a modal from an API.

// Allows users to join courses via another API request.

// Updates the UI in real time to reflect join status.

// Uses jQuery for DOM manipulation and AJAX requests.

// In short:
// It creates a simple interactive course enrollment system inside a modal window.
