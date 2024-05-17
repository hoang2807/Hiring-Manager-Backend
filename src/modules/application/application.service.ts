import { NotificationService } from './../notification/notification.service';
import { NotificationGateway } from './../../notification/notification.gateway';
import { DatabaseService } from 'src/database/database.service';
import { Injectable } from '@nestjs/common';
import { CreateApplicationDto } from './dto/create-application.dto';
import { UpdateApplicationDto } from 'src/modules/application/dto/update-application.dto';
// import { Status } from '@prisma/client';
import * as fs from 'fs';
import { join } from 'path';

@Injectable()
export class ApplicationService {
  constructor(
    private databaseService: DatabaseService,
    private notificationGateway: NotificationGateway,
    private notificationService: NotificationService,
  ) {}

  async create(createApplicationDto: CreateApplicationDto, cv: string) {
    const existCv = await this.databaseService.applications.findFirst({
      where: {
        userId: +createApplicationDto.userId,
        jobId: +createApplicationDto.jobId,
      },
    });
    if (!existCv?.cv)
      return this.databaseService.applications.create({
        data: {
          userId: +createApplicationDto.userId,
          cv,
          score: 0,
          jobId: +createApplicationDto.jobId,
          enterpriseId: +createApplicationDto.enterpriseId,
          fullName: createApplicationDto.fullName,
          email: createApplicationDto.email,
          phone_number: createApplicationDto.phone_number,
        },
      });
    else {
      const data = await this.databaseService.applications.update({
        where: {
          id: existCv.id,
        },
        data: {
          cv,
        },
      });
      fs.unlinkSync(join(process.cwd(), 'upload', existCv.cv));

      return data;
    }
  }

  async list(enterpriseId: number) {
    return this.databaseService.applications.findMany({
      where: {
        enterpriseId,
      },
    });
  }

  async listJob(enterpriseId: number, jobId: number) {
    return this.databaseService.applications.findMany({
      where: {
        enterpriseId,
        jobId,
      },
    });
  }

  async updateStatus(id: number, updateApplicationDto: UpdateApplicationDto) {
    const data = await this.getStatusCode(id);

    const status = data.status;
    const userId = data.userId;
    const jobId = data.jobId;
    const enterpriseId = data.enterpriseId;
    const nameJob = data.jobName;

    const enterprise = await this.databaseService.enterprise.findUnique({
      where: {
        id: enterpriseId,
      },
    });

    // const job = await this.databaseService.job.findUnique({
    //   where: {
    //     id: jobId,
    //   },
    // });

    const name = enterprise.name;
    // const nameJob = job.title;

    if (status === 'NOT_SEEN') {
      if (updateApplicationDto.status === 'WATCHED') {
        await this.notificationService.create(
          userId,
          jobId,
          enterpriseId,
          `Nhà tuyển dụng ${name} với công việc ${nameJob} đã xem hồ sơ của bạn`,
        );
        this.notificationGateway.emitSendNotification(
          userId,
          `Nhà tuyển dụng ${name} với công việc ${nameJob} đã xem hồ sơ của bạn`,
        );
      }
      if (updateApplicationDto.status === 'NOT_SUITABLE') {
        await this.notificationService.create(
          userId,
          jobId,
          enterpriseId,
          `Nhà tuyển dụng ${name} với công việc ${nameJob} đánh giá hồ sơ của bạn là không phù hợp`,
        );
        this.notificationGateway.emitSendNotification(
          userId,
          `Nhà tuyển dụng ${name} với công việc ${nameJob} đánh giá hồ sơ của bạn là không phù hợp`,
        );
      }

      if (updateApplicationDto.status === 'SUITABLE') {
        await this.notificationService.create(
          userId,
          jobId,
          enterpriseId,
          `Nhà tuyển dụng ${name} với công việc ${nameJob} đã đánh giá hồ sơ của bạn là phù hợp`,
        );
        this.notificationGateway.emitSendNotification(
          userId,
          `Nhà tuyển dụng ${name} với công việc ${nameJob} đã đánh giá hồ sơ của bạn là phù hợp`,
        );
      }

      return await this.databaseService.applications.update({
        where: {
          id,
        },
        data: {
          status: updateApplicationDto.status,
        },
      });
    }
    if (status === 'WATCHED' && updateApplicationDto.status !== 'WATCHED') {
      if (updateApplicationDto.status === 'NOT_SUITABLE') {
        await this.notificationService.create(
          userId,
          jobId,
          enterpriseId,
          `Nhà tuyển dụng ${name} với công việc ${nameJob} đánh giá hồ sơ của bạn là không phù hợp`,
        );
        this.notificationGateway.emitSendNotification(
          userId,
          `Nhà tuyển dụng ${name} với công việc ${nameJob} đánh giá hồ sơ của bạn là không phù hợp`,
        );
      }

      if (updateApplicationDto.status === 'SUITABLE') {
        await this.notificationService.create(
          userId,
          jobId,
          enterpriseId,
          `Nhà tuyển dụng ${name} với công việc ${nameJob} đã đánh giá hồ sơ của bạn là phù hợp`,
        );
        this.notificationGateway.emitSendNotification(
          userId,
          `Nhà tuyển dụng ${name} với công việc ${nameJob} đã đánh giá hồ sơ của bạn là phù hợp`,
        );
      }
      return await this.databaseService.applications.update({
        where: {
          id,
        },
        data: {
          status: updateApplicationDto.status,
        },
      });
    }
    if (
      (status === 'NOT_SUITABLE' || status === 'SUITABLE') &&
      updateApplicationDto.status !== 'WATCHED'
    ) {
      if (updateApplicationDto.status === 'NOT_SUITABLE') {
        await this.notificationService.create(
          userId,
          jobId,
          enterpriseId,
          `Nhà tuyển dụng ${name} với công việc ${nameJob} đánh giá hồ sơ của bạn là không phù hợp`,
        );
        this.notificationGateway.emitSendNotification(
          userId,
          `Nhà tuyển dụng ${name} với công việc ${nameJob} đánh giá hồ sơ của bạn là không phù hợp`,
        );
      }
      if (updateApplicationDto.status === 'SUITABLE') {
        await this.notificationService.create(
          userId,
          jobId,
          enterpriseId,
          `Nhà tuyển dụng ${name} với công việc ${nameJob} đã đánh giá hồ sơ của bạn là phù hợp`,
        );
        this.notificationGateway.emitSendNotification(
          userId,
          `Nhà tuyển dụng ${name} với công việc ${nameJob} đã đánh giá hồ sơ của bạn là phù hợp`,
        );
      }
      return await this.databaseService.applications.update({
        where: {
          id,
        },
        data: {
          status: updateApplicationDto.status,
        },
      });
    }
    return await this.databaseService.applications.findUnique({
      where: {
        id,
      },
    });
  }

  async updateScore(id: number, score: number) {
    return await this.databaseService.applications.update({
      where: {
        id,
      },
      data: {
        score,
      },
    });
  }

  async getStatusCode(id: number) {
    return this.databaseService.applications.findUnique({
      where: {
        id,
      },
    });
  }
}
