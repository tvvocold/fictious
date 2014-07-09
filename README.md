== README

Fictious is a Ruby on Rails + Backbone.js clone of [Medium](medium.com).

## Features

### Authentication
Custom, hand-written user authentication and session management, utilizing BCrypt for secure password storage. Facebook login with OAuth.

### Javascript
Extensive JavaScript manages posts, scanning content for paragraph tags and assigns each paragraph a unique, randomly generated hex-code upon submission. On the post show page, the comments and comment form are associated with this unique identifier, and are revealed when the user clicks the comment-reveal ("+") button. Additionally, these hex-IDs maintain comment associations even after the post has been edited, where they would otherwise be lost.

Nav and comment reveal animations are handled by custom JavaScript and CSS.

### Backbone
All pages have Backbone.js integration, allowing for snappier UI/UX. Custom JSON serializers on the post and collection models allow for image uploading and instant image preview. A custom parse method on the post model pulls comment data.

### CSS
Hand-written CSS, with hover, click, focus, and transition effects. 

### Database
A custom SQL query handles the "Top 100" section on the home page, ordering posts by number of likes without adding a "likes_count" column to the posts table. 

### Ruby/Rails
Polymorphic notifications that notify users when they gain either a subscriber or a like. These notifications disappear from the notification dropdown after a user follows the note-link. 


**TODO**

0. Fix javascript event-related bugs in Firefox (Chrome and Safari handle events properly)
1. Add missing.png
2. Beautify error handling
3. Add stats page
4. Action Mailer integration
