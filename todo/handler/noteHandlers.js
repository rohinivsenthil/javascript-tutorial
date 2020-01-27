const uid = require('uid');
const fileOperations = require('../utils/fileOperations');
const dailyQuote = require('inspirational-quotes');

const postNote = async (request, h) => {
	let body = request.payload;	
	const key1 = 'noteId';
	const value1 = uid();
	const key2 = 'isActive';
	const value2 = 'true';
	body[key1] = value1;
	body[key2] = value2; //use spread
	let data = await fileOperations.readFromNotes('./listOfNotes.json');     
	let arrayOfNotes = JSON.parse(data);
	arrayOfNotes.notes.push(body);
	await fileOperations.writeToNotes('./listOfNotes.json', JSON.stringify(arrayOfNotes));
	return h.response('Note added');
};

const getNotes = async (response, h) => {

	let notes = await fileOperations.readFromNotes('./listOfNotes.json');
	let parsedNotes = JSON.parse(notes);
	return h.response(JSON.stringify(parsedNotes));

};

const getQuote = (response, h) => {
	let quote = dailyQuote.getRandomQuote();
	return h.response(quote);

};

const deleteNote = async (request, h) => {
	let url = request.url.toString().split('/');
	let id = url[url.length - 1];
	let data = await fileOperations.readFromNotes('./listOfNotes.json');     
	let arrayOfNotes = JSON.parse(data);
	let filterObj = arrayOfNotes.notes.filter(function(obj) {
		return obj.noteId != id;
	});
	//noteList = {note:[]}
	await fileOperations.writeToNotes('./listOfNotes.json', JSON.stringify(filterObj));
	return JSON.stringify(filterObj);

};

const modifyNote = async (response, h) => {

};

module.exports = {getNotes, getQuote, postNote, deleteNote, modifyNote};