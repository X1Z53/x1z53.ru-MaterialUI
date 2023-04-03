/*
	An Element with a class 'button' - is a trigger
	An Element with a class, that includes an id of the trigger - is a respondent

	Example:
	div.button#hello - trigger
	div.hello - respondent
*/

var buttons		= document.getElementsByClassName('button')
	tags		= []
	elements	= {}

for (var i = 0; i < buttons.length; i++) {
	tags[i] = buttons[i].id
	elements[tags[i]] = document.getElementsByClassName(tags[i])
}


for (var i = 0; i < buttons.length; i++) {
	buttons[i].addEventListener('click', function(button=buttons) {
		console.log(button)
		var items = elements[button.target.id]
		for (var j = 0; j < items.length; j++) {
			element = items[j]
			klasses = element.className.split(' ')
			klass = (klasses.slice(-1) == 'hide') ? 'show' : 'hide'
			klasses = klasses.slice(0, -1).join(' ')
			console.log(klasses)
			element.className = klasses + ' ' + klass

		}
	})
}
