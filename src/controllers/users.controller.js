import logger from '#config/logger.js';
import {
  getAllUsers,
  getUserById as getUserByIdService,
  updateUser as updateUserService,
  deleteUser as deleteUserService,
} from '#services/users.services.js';
import {
  userIdSchema,
  updateUserSchema,
} from '#validations/users.validation.js';
import { jwttoken } from '#utils/jwt.js';
import { cookies } from '#utils/cookies.js';

export const fetchAllUsers = async (req, res, next) => {
  try {
    logger.info('Getting users...');

    const allUsers = await getAllUsers();
    res.json({
      message: 'Successfully retrieved users',
      users: allUsers.map(u => ({
        id: u.id,
        name: u.name,
        email: u.email,
        role: u.role,
        created_at: u.created_at,
        updated_at: u.updated_at,
      })),
      count: allUsers.length,
    });
  } catch (e) {
    logger.error(e);
    next(e);
  }
};

export const fetchUserById = async (req, res, next) => {
  try {
    const validationResult = userIdSchema.safeParse(req.params);
    if (!validationResult.success) {
      return res.status(400).json({
        error: 'Validation failed',
        details: validationResult.error.issues,
      });
    }

    const { id } = validationResult.data;
    logger.info(`Getting user by id: ${id}`);

    const user = await getUserByIdService(id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({
      message: 'Successfully retrieved user',
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        created_at: user.created_at,
        updated_at: user.updated_at,
      },
    });
  } catch (e) {
    logger.error(e);
    next(e);
  }
};

export const updateUserById = async (req, res, next) => {
  try {
    const idValidation = userIdSchema.safeParse(req.params);
    if (!idValidation.success) {
      return res
        .status(400)
        .json({
          error: 'Validation failed',
          details: idValidation.error.issues,
        });
    }
    const bodyValidation = updateUserSchema.safeParse(req.body);
    if (!bodyValidation.success) {
      return res
        .status(400)
        .json({
          error: 'Validation failed',
          details: bodyValidation.error.issues,
        });
    }

    const { id } = idValidation.data;
    const updates = bodyValidation.data;

    const token = cookies.get(req, 'token');
    const decoded = token ? jwttoken.verify(token) : null;
    if (!decoded) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const isOwner = decoded.id === id;
    const isAdmin = decoded.role === 'admin';

    if (!isOwner && !isAdmin) {
      return res
        .status(403)
        .json({ error: 'Forbidden: cannot modify other users' });
    }

    if (Object.prototype.hasOwnProperty.call(updates, 'role') && !isAdmin) {
      return res
        .status(403)
        .json({ error: 'Forbidden: only admin can change role' });
    }

    logger.info(
      `Updating user id=${id} by user id=${decoded.id} role=${decoded.role}`
    );
    const updated = await updateUserService(id, updates);

    res.json({
      message: 'User updated successfully',
      user: {
        id: updated.id,
        name: updated.name,
        email: updated.email,
        role: updated.role,
        created_at: updated.created_at,
        updated_at: updated.updated_at,
      },
    });
  } catch (e) {
    logger.error('Update user error: ', e);

    if (e.message === 'User not found') {
      return res.status(404).json({ error: 'User not found' });
    }

    next(e);
  }
};

export const deleteUserById = async (req, res, next) => {
  try {
    const validationResult = userIdSchema.safeParse(req.params);
    if (!validationResult.success) {
      return res
        .status(400)
        .json({
          error: 'Validation failed',
          details: validationResult.error.issues,
        });
    }
    const { id } = validationResult.data;

    const token = cookies.get(req, 'token');
    const decoded = token ? jwttoken.verify(token) : null;
    if (!decoded) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const isOwner = decoded.id === id;
    const isAdmin = decoded.role === 'admin';
    if (!isOwner && !isAdmin) {
      return res
        .status(403)
        .json({ error: 'Forbidden: cannot delete other users' });
    }

    logger.info(
      `Deleting user id=${id} by user id=${decoded.id} role=${decoded.role}`
    );
    await deleteUserService(id);

    res.json({ message: 'User deleted successfully' });
  } catch (e) {
    logger.error('Delete user error: ', e);
    if (e.message === 'User not found') {
      return res.status(404).json({ error: 'User not found' });
    }
    next(e);
  }
};
