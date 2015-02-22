'use strict';

var serviceFactory = require("../service");
var auth = require("./Authentication");

var index = require('../');

exports.init = function(app)  {

	/*app.post('/profile', auth.requireNotLogged, auth.authenticate, serviceFactory.getProfileService().login);  //LOGIN
	app.delete('/profile', auth.requireLogged, serviceFactory.getProfileService().logout);  //LOGOUT
	app.get('/profile', auth.requireLogged, serviceFactory.getProfileService().getProfile );
	app.put('/profile', auth.requireLogged, serviceFactory.getProfileService().updatePassword );

	if (app.config.allowSignup) {
		app.post('/register',  auth.requireNotLogged, serviceFactory.getUserService().registerUser );
	} else {
		app.post('/register',  auth.requireNotLogged, serviceFactory.getUserService().disabledRegisterUser );
	}

	app.post('/password/forgot', auth.requireNotLogged, serviceFactory.getForgotService().passwordResetRequest);
	app.put('/password/forgot', auth.requireNotLogged, serviceFactory.getForgotService().passwordReset);

	app.get('/users', auth.requireAdmin, serviceFactory.getUserService().usersList );
	app.post('/users', auth.requireAdmin, serviceFactory.getUserService().insertUser );

	app.get('/users/:id', auth.requireAdmin, serviceFactory.getUserService().userIdShowPage);
	app.put('/users/:id', auth.requireAdmin, serviceFactory.getUserService().updateLevel);
	app.delete('/users/:id',  auth.requireAdmin, serviceFactory.getUserService().deleteUser);

	app.get("/collections", auth.requireLogged, serviceFactory.getCollectionService().list);

	app.get("/collections/:collectionId", auth.requireLogged, serviceFactory.getIndexService().getIndexPage);

	app.get("/collections/:collectionId/:documentId", auth.requireLogged,  serviceFactory.getShowService().getShowPage);
	app.delete("/collections/:collectionId/:documentId", auth.requireAdmin, serviceFactory.getShowService().deleteDocument);
	app.put("/collections/:collectionId/:documentId", auth.requireAdmin, serviceFactory.getShowService().editDocument);*/

	app.get('/api/gallery', serviceFactory.getGalleryService().getImages);

	app.get('/api/news', serviceFactory.getNewsService().newsList);
	app.post('/api/news', serviceFactory.getNewsService().createNews);
	app.get('/api/news/:newsId/image', serviceFactory.getNewsService().getNewsImage);
	app.get('/api/news/:newsId', serviceFactory.getNewsService().findById);
	app.delete('/api/news/:newsId', serviceFactory.getNewsService().deleteNewsById);
	app.put('/api/news/:newsId', serviceFactory.getNewsService().updateNewsById);
	app.put('/api/news/:newsId/image', serviceFactory.getNewsService().updateCoverById);

	app.get('/api/contacts', serviceFactory.getContactService().getContacts);
	app.post('/api/contacts', serviceFactory.getContactService().createContact);
	app.get('/api/contacts/:contactId', serviceFactory.getContactService().getContactById);
	app.delete('/api/contacts/:contactId', serviceFactory.getContactService().deleteContactById);
	app.put('/api/contacts/:contactId', serviceFactory.getContactService().editContactById);

	app.get('/api/admin', auth.requireLogged, serviceFactory.getAdminService().getAdmins);
	app.post('/api/admin', auth.requireLogged, serviceFactory.getAdminService().createAdmin);
	app.delete('/api/admin/:adminId', auth.requireLogged, serviceFactory.getAdminService().deleteAdminById);

	app.get('/partials/*', index.partials);
	app.get('/*', index.index);

	app.use(app.router);
};
