
/**
 * @swagger
 * components:
 *   schemas:
 *     DataSource:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         userId:
 *           type: string
 *         title:
 *           type: string
 *         contentType:
 *           type: string
 *           example: text/plain
 *         content:
 *           type: string
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *
 *     CreateDataSource:
 *       type: object
 *       required:
 *         - userId
 *         - content
 *       properties:
 *         userId:
 *           type: string
 *         title:
 *           type: string
 *         contentType:
 *           type: string
 *           example: application/json
 *         content:
 *           type: string
 *
 *     UpdateDataSource:
 *       type: object
 *       properties:
 *         title:
 *           type: string
 *         contentType:
 *           type: string
 *         content:
 *           type: string
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     FileSource:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         userId:
 *           type: string
 *         originalName:
 *           type: string
 *         fileName:
 *           type: string
 *         mimeType:
 *           type: string
 *         size:
 *           type: integer
 *         path:
 *           type: string
 *         createdAt:
 *           type: string
 *           format: date-time
 */

