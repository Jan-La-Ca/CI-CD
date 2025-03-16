import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { CryptoService } from '../crypto/crypto.service';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { UserExistedException } from './exceptions/user-is-existed.exception';
import { Role, Status } from '@prisma/client';
import { InvalidUserInputException } from './exceptions/invalid-user-input.exception';
import { InvalidUserPassword } from './exceptions/invalid-user-password.exception';

jest.mock("bcrypt")

describe('AuthService', () => {
  let service: AuthService;
  let prismaService: jest.Mocked<PrismaService>
  let userService: jest.Mocked<UserService>
  // let jwtService: jest.Mocked<JwtService>
  let cryptoService: jest.Mocked<CryptoService>

  const mockUserData = {
    email: "user-test60@gmail.com",
    password: "Tiennguyen123@",
    name: "Nguyen Ngoc Tien",
    role: Role.USER,
    status: Status.ACTIVE
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: PrismaService,
          useValue: {
            users: {
              findUnique: jest.fn(),
              create: jest.fn(),
            },
            tokens: {
              deleteMany: jest.fn(),
              upsert: jest.fn(),
              findFirst: jest.fn(),
            },
          },
        },
        {
          provide: UserService,
          useValue: {
            findOne: jest.fn()
          }
        },
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn(),
            verify: jest.fn()
          }
        },
        {
          provide: CryptoService,
          useValue: {
            encodeBcrypt: jest.fn(),
            comparePassword: jest.fn(),
          }
        },
        {
          provide: 'ENV',
          useValue: {
            EXPIRED_ACCESS_TOKEN: '1h',
            EXPIRED_REFRESH_TOKEN: '7d',
            SECRET_KEY: 'test-secret',
          },
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    prismaService = module.get(PrismaService);
    // jwtService = module.get(JwtService)
    userService = module.get(UserService)
    cryptoService = module.get(CryptoService)
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe("Register", () => {
    it("should throw UserIsExistedException if user existed", async () => {
      userService.findOne.mockResolvedValue(mockUserData);

      await expect(
        service.createOne({
          email: 'test@example.com', password: 'password123',
          name: '',
          role: ''
        }),
      ).rejects.toThrow(UserExistedException);
    })

    it('should create a new user and omit the password', async () => {
      userService.findOne.mockResolvedValue(null);
      cryptoService.encodeBcrypt.mockResolvedValue('hashedPassword');
      (prismaService.users.create as jest.Mock).mockResolvedValue({
        email: 'test@example.com',
        password: 'hashedPassword',
        name: "nguyen ngoc tien",
        role: Role.USER,
        status: Status.ACTIVE,
      });
  
      const result = await service.createOne({
        email: 'test@example.com',
        password: 'hashedPassword',
        name:"nguyen ngoc tien",
        role: Role.USER,
       });
  
      expect(result).toEqual({
        email: 'test@example.com',
        name: "nguyen ngoc tien",
        role: Role.USER,
        status: Status.ACTIVE,
      });
      expect(cryptoService.encodeBcrypt).toHaveBeenCalledTimes(1)
  })
})
describe("Login", () => {
  it('Should throw InvalidUserInputException when user is not existed', async () => {
    userService.findOne.mockResolvedValue(null)
    await expect(service.login({email: "test@example.com", password: "password123"})).rejects.toThrow(InvalidUserInputException)
  })
  it('Should throw InvalidUserPassword when password do not match', async () => {
    userService.findOne.mockResolvedValue(mockUserData)
    cryptoService.comparePassword.mockResolvedValue(false)
    await expect(service.login({email: "test@example.com", password: "password123"})).rejects.toThrow(InvalidUserPassword)
  })
})

})
