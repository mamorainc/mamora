import { Request, Response } from 'express';

type ServiceMethod = (req: Request) => Promise<{
  status: number;
  message: string;
  data: any;
}>;

export const callService = async (
  method: ServiceMethod,
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const result = await method(req);

    const token = result?.data?.token;

    if (token) {
      res.cookie('authorization', token);
    }
    res.status(result.status).json({
      status: result.status,
      message: result.message,
      data: result.data,
    });
  } catch (err) {
    res.status(401).json({
      message: 'Error',
    });
  }
};
