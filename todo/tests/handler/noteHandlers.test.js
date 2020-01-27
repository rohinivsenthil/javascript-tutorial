let {init} = require('../../server');
const fs = require('promise-fs');
const {getNotes, getQuote, postNote, deleteNote, modifyNote} = require('../../handler/noteHandlers');
const fileOperations = require('../../utils/fileOperations');
const dailyQuote = require('inspirational-quotes');
const str = '{"notes":[{"title":"Note 1","description":"Note 1 description","noteId":"gaqa5v6","isActive":"true"},{"title":"Note 2","description":"Note 2 description","noteId":"r7uf6tc","isActive":"true"},{"title":"Note 3","description":"Note 3 description","noteId":"8tjrema","isActive":"true"},{"title":"Note 4","description":"Note 4 description","noteId":"myuqpje","isActive":"true"}]}';

describe('the handlers,', () => {  
	
	let server;

	beforeEach(async () => {
		server = await init();
	});

	afterEach(async () => {
		await server.stop();
	});


	it('should call the getNotes handler function which returns a response with all notes when /notes is hit with GET', async (done) => {
		const mock = {
			response: jest.fn()
		};
		await getNotes(null, mock);
		expect(mock.response).toHaveBeenCalledWith(str);
		mock.response.mockRestore();
		done();
	});

	it('should call the postNotes handler function which appends the new note to the JSON file when /notes is hit with POST', async (done) => {
		const mockRequest = {
			payload: {
				title: 'Note 5',
				description: 'Note 5 description'
			}
		};	
		const mockReadFromNotes = jest.spyOn(fileOperations, 'readFromNotes');
		const mockWriteToNotes = jest.spyOn(fileOperations, 'writeToNotes');
		await postNote(mockRequest, null);
		expect(mockReadFromNotes).toHaveBeenCalled();
		expect(mockWriteToNotes).toHaveBeenCalled();
		mockReadFromNotes.mockRestore();
		mockWriteToNotes.mockRestore();
		done();
	});

	// it('should delete expected note when /notes/{id} is hit with DELETE', async (done) => {
	// 	let obj = {
	// 		method: 'DELETE',
	// 		url: '/notes/myuqpje'
	// 	};
	// 	await server.inject(obj);
	// 	let data = await fileOperations.readFromNotes('./listOfNotes.json'); 
	// 	let notesObj = JSON.parse(data);
	// 	let filterObj = notesObj.notes.filter(function(obj) {
	// 		return obj.noteId == 'myuqpje';
	// 	});
	// 	console.log(filterObj);
	// 	expect(filterObj).toBe([]);
	// 	done();
	// });


	it('should call the getQuote handler function which returns a response with a quote when /quotes is hit with GET', async (done) => {
		dailyQuote.getRandomQuote = jest.fn();
		const mockResponse = {
			response: jest.fn()
		};
		getQuote(null, mockResponse);
		expect(dailyQuote.getRandomQuote).toHaveBeenCalled();
		expect(mockResponse.response).toHaveBeenCalled();
		dailyQuote.getRandomQuote.mockRestore();
		mockResponse.response.mockRestore();
		done();
	});







});
