USE [master]

IF db_id('Gas') IS NULl
  CREATE DATABASE [Gas]
GO

USE [Gas]
GO


DROP TABLE IF EXISTS [Comment];
DROP TABLE IF EXISTS [Item];
DROP TABLE IF EXISTS [Category];
DROP TABLE IF EXISTS [User];


GO



CREATE TABLE [User] (
  [Id] integer PRIMARY KEY IDENTITY NOT NULL,
  [FirebaseUserId] nvarchar(50) NOT NULL,
  [FirstName] nvarchar(50) NOT NULL,
  [LastName] nvarchar(50) NOT NULL,
  [Email] nvarchar(555) NOT NULL

   CONSTRAINT UQ_FirebaseUserId UNIQUE(FirebaseUserId)
)
GO

CREATE TABLE [Category] (
  [Id] int PRIMARY KEY IDENTITY NOT NULL,
  [Title] nvarchar(50) NOT NULL
)
 GO

CREATE TABLE [Item] (
  [Id] integer PRIMARY KEY IDENTITY NOT NULL,
  [UserId] integer NOT NULL,
  [CategoryId] integer NOT NULL,
  [Title] nvarchar(50) NOT NULL,
  [Description] nvarchar(max) NOT NULL,
  [IsForSale] bit NOT NULL,
  [SalePrice] nvarchar(50),
  [ImageUrl] nvarchar(max) NOT NULL

  CONSTRAINT [FK_Item_User] FOREIGN KEY ([UserId]) REFERENCES [User] ([Id]),
  CONSTRAINT [FK_Item_Category] FOREIGN KEY ([CategoryId]) REFERENCES [Category] ([Id])
)
GO

CREATE TABLE [Comment] (
  [Id] integer PRIMARY KEY IDENTITY NOT NULL,
  [ItemId] integer NOT NULL,
  [UserId] integer NOT NULL,
  [Title] nvarchar(50) NOT NULL,
  [Description] nvarchar(max) NOT NULL

  CONSTRAINT [FK_Comment_Item] FOREIGN KEY ([ItemId]) REFERENCES [Item] ([Id]),
  CONSTRAINT [FK_Comment_User] FOREIGN KEY ([UserId]) REFERENCES [User] ([Id])
)
GO