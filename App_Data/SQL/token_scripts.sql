
/****** Object:  Table [dbo].[out_Token]    Script Date: 04/19/2017 23:07:23 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[out_Token](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Key] [varchar](100) NULL,
	[IssuedOn] [datetime] NULL,
	[ExpiresOn] [datetime] NULL,
	[CreatedTime] [datetime] NULL,
	[AppId] [int] NULL,
 CONSTRAINT [PK_out_Token] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
SET ANSI_PADDING OFF
GO
SET IDENTITY_INSERT [dbo].[out_Token] ON
INSERT [dbo].[out_Token] ([Id], [Key], [IssuedOn], [ExpiresOn], [CreatedTime], [AppId]) VALUES (6, N'9/+BQ1T65e/BXT10WKpls82KBPyl7UpkmeGjYuoQM2zoWWkJ6Ze7AJkQ71o5H7YTBb+yB4ZhBe9w/BAC8TUSrw==', CAST(0x0000A74400B7DABA AS DateTime), CAST(0x0000A74400C01828 AS DateTime), CAST(0x0000A74400B7DAC8 AS DateTime), 1)
SET IDENTITY_INSERT [dbo].[out_Token] OFF
/****** Object:  Table [dbo].[RegisterUser]    Script Date: 04/19/2017 23:07:23 ******/

CREATE TABLE [dbo].[out_App](
	[AppId] [int] IDENTITY(1,1) NOT NULL,
	[Name] [varchar](100) NULL,
	[Description] [varchar](100) NULL,
	[PersonInCharge] [varchar](100) NULL,
	[CreatedTime] [datetime] NULL,
	[EmailId] [varchar](100) NULL,
	[Status] [bit] NULL,
	[CustomerId] [int] NULL,
 CONSTRAINT [PK_RegsiterCompany] PRIMARY KEY CLUSTERED 
(
	[AppId] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
SET ANSI_PADDING OFF
GO
SET IDENTITY_INSERT [dbo].[out_App] ON
INSERT [dbo].[out_App] ([AppId], [Name], [Description], [PersonInCharge], [CreatedTime], [EmailId], [Status], [CustomerId]) VALUES (1, N'Mobile', N'ASP Cor', N'huyvd.it', CAST(0x0000A73E009B6842 AS DateTime), N'huyvd.it@gmail.com', 1, 1)
SET IDENTITY_INSERT [dbo].[out_App] OFF
/****** Object:  Table [dbo].[MusicStore]    Script Date: 04/19/2017 23:07:23 ******/

SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[out_ClientKey](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[AppId] [int] NULL,
	[ClientId] [varchar](100) NULL,
	[ClientSecret] [varchar](100) NULL,
	[CreatedTime] [datetime] NULL,
	[CustomerId] [int] NULL,
 CONSTRAINT [PK_out_ClientKeys] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
SET ANSI_PADDING OFF
GO
SET IDENTITY_INSERT [dbo].[out_ClientKey] ON
INSERT [dbo].[out_ClientKey] ([Id], [AppId], [ClientId], [ClientSecret], [CreatedTime], [CustomerId]) VALUES (1, 1, N'pGU6RJ8ELcVRZmN', N'tiIfdZ3vh5IwGVm', CAST(0x0000A73F009199A3 AS DateTime), 1)
SET IDENTITY_INSERT [dbo].[out_ClientKey] OFF
