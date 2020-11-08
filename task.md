Good day.

Test tasks for Sergej. Should take approximately 4h

Please accomplish task with your imagined design.

Create a responsive single page (frontend-only) application.
Required technologies: Angular 10+, Sass or Less. You can also use any additional libraries and frameworks if needed.
Application consists of 2 pages: main page and timer edit page.
Both pages should be viewable on any screen size between 320px and 1980px without horizontal scrolling, all elements should be fitted and reordered according to the screen size (using responsive/adaptive design principles)

### Workflow is as follows:
On a main page system operator has an Add button.
When they press the button they should see an edit page, the content of the page should be:

Fields:
* Timer name (e.g. "Turn off the oven")
* Timer duration (including minutes, seconds)

Buttons:
* Save - should save or update a timer, begin the countdown and return to the main page
* Cancel - should close the edit page without updating or saving the timer

On the main page the list of Timers should be visible

Not more than 3 timers can be added

Each timer should be displayed the following way:
* Name
* Live countdown
* Pause/Resume button
* Edit button - when the timer is paused we can edit it
* Remove button

After any of timers reaches 0:00 the modal with timer's name should be displayed

After the modal is closed the timer should be deleted

### Details:
Using additional libraries and frameworks is an advantage
Proper using of RxJs with explanations is an advantage

### Bonus tasks:
* Order timers by time left first and by name second
* Add customizable clock icons on each timer

---

Questions:
* `Application consists of 2 pages`
    * Do you need routing here? I think not, and the add/edit form can be shown as a dialog box. For now - I`ll implement at another page.
* `After any of timers reaches 0:00 the modal with timer's name should be displayed`
    * I believe that it is better to show not a modal window here, but a notification, because while the modal window is hanging, the second timer may end, and showing two modal windows is bad.
* `Edit button - when the timer is paused we can edit it`
    * What if we change duration, increase or decrease ? For now - I`ll block change duration.
