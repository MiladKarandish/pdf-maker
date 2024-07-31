import { Router } from 'express';
import { getPageAsPdf } from '../../controllers/pdf/index';

const router: Router = Router();

router.post('/', getPageAsPdf);

export default router;
