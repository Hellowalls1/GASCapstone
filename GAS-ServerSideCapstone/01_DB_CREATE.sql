USE [master]

IF db_id('Gas') IS NULl
  CREATE DATABASE [Gas]
GO

USE [Gas]
GO


DROP TABLE IF EXISTS [User];
DROP TABLE IF EXISTS [Item];
DROP TABLE IF EXISTS [Comment];
DROP TABLE IF EXISTS [Category];
GO



CREATE TABLE [User] (
  [Id] integer PRIMARY KEY NOT NULL,
  [FirebaseUserId] nvarchar(50) NOT NULL,
  [FirstName] nvarchar(50) NOT NULL,
  [LastName] nvarchar(50) NOT NULL,
  [Email] nvarchar(555) NOT NULL

   CONSTRAINT UQ_FirebaseUserId UNIQUE(FirebaseUserId)
)
GO

CREATE TABLE [Category] (
  [Id] int PRIMARY KEY NOT NULL,
  [Title] nvarchar(50) NOT NULL
)
 GO

CREATE TABLE [Item] (
  [Id] integer PRIMARY KEY NOT NULL,
  [UserId] integer NOT NULL,
  [CategoryId] integer NOT NULL,
  [Title] nvarchar(50) NOT NULL,
  [Description] text NOT NULL,
  [IsForSale] bit NOT NULL,
  [SalePrice] nvarchar,
  [ImageUrl] nvarchar(555) NOT NULL

  CONSTRAINT [FK_Item_User] FOREIGN KEY ([UserId]) REFERENCES [User] ([Id]),
  CONSTRAINT [FK_Item_Category] FOREIGN KEY ([CategoryId]) REFERENCES [Category] ([Id])
)
GO

CREATE TABLE [Comment] (
  [Id] int PRIMARY KEY NOT NULL,
  [ItemId] int NOT NULL,
  [UserId] int NOT NULL,
  [Title] nvarchar(50) NOT NULL,
  [Description] nvarchar(555) NOT NULL

  CONSTRAINT [FK_Comment_Item] FOREIGN KEY ([ItemId]) REFERENCES [Item] ([Id]),
  CONSTRAINT [FK_Comment_User] FOREIGN KEY ([UserId]) REFERENCES [User] ([Id])
)
GO