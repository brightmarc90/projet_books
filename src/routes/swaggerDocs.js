/**
 * @swagger
 * components:
 *   schemas:
 *     Book:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: ID unique du livre
 *         title:
 *           type: string
 *           description: Le titre du livre
 *         author:
 *           type: string
 *           description: L'auteur du livre
 *         year:
 *           type: integer
 *           description: L'année de publication
 *         genre:
 *           type: string
 *           description: Le genre du livre
 *         status:
 *           type: string
 *           enum: [Disponible, Emprunté]
 *           description: Statut du livre
 */

/**
 * @swagger
 * /books:
 *   get:
 *     summary: Récupérer tous les livres
 *     tags: [Books]
 *     responses:
 *       200:
 *         description: Liste des livres récupérée avec succès
 *       404:
 *         description: Aucun livre trouvé
 *       500:
 *         description: Erreur serveur lors de la récupération des livres
 */

/**
 * @swagger
 * /books/{id}:
 *   get:
 *     summary: Récupérer un livre par son ID
 *     tags: [Books]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: L'ID du livre à récupérer
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Livre récupéré avec succès
 *       404:
 *         description: Livre non trouvé
 *       500:
 *         description: Erreur serveur lors de la récupération du livre
 */

/**
 * @swagger
 * /books:
 *   post:
 *     summary: Créer un nouveau livre
 *     tags: [Books]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Book'
 *     responses:
 *       201:
 *         description: Le livre a été créé avec succès
 *       400:
 *         description: Données invalides
 */

/**
 * @swagger
 * /books/{id}:
 *   put:
 *     summary: Mettre à jour un livre par son ID
 *     tags: [Books]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: L'ID du livre à mettre à jour
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Book'  # Référence au schéma Book
 *     responses:
 *       200:
 *         description: Livre mis à jour avec succès
 *       400:
 *         description: Données invalides
 *       404:
 *         description: Livre non trouvé
 *       500:
 *         description: Erreur serveur lors de la mise à jour du livre
 */

/**
 * @swagger
 * /books/{id}:
 *   delete:
 *     summary: Supprimer un livre par son ID
 *     tags: [Books]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: L'ID du livre à supprimer
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Livre supprimé avec succès
 *       404:
 *         description: Livre non trouvé
 *       500:
 *         description: Erreur serveur lors de la suppression du livre
 */

