
set identity_insert [Category] on
insert into [Category] ([ID], [Title]) VALUES (1, 'Guitar'), (2, 'Bass'), (3, 'Drums'), (4, 'Recording'), (5, 'Keys/Synth'), (6, 'Live Sound'), (7, 'Amp'), (8, 'Pedal'), (9, 'Acoustic Instrument');
set identity_insert [Category] off

set identity_insert [Comment] on
insert into [Comment] ([Id], [ItemId], [UserId], [Title], [Description]) values (1, 1, 1, "Killer Guitar", "What is your asking Price?");
insert into [Comment] ([Id], [ItemId], [UserId], [Title], [Description]) values (2, 1, 2, "Killer Guitar", "My asking price is $1500.");
insert into [Comment] ([Id], [ItemId], [UserId], [Title], [Description]) values (3, 1, 1, "Killer Guitar", "Yea! My number is 666-666-6666. Shoot me a text and we can work it out!"); 
insert into [Comment] ([Id], [ItemId], [UserId], [Title], [Description]) values (5, 2, 2, "Trades for Amp?", "Are you open to any trades?");
insert into [Comment] ([Id], [ItemId], [UserId], [Title], [Description]) values (6, 2, 3, "Trades for Amp?", "Only if you have a Princeton Reverb.");
insert into [Comment] ([Id], [ItemId], [UserId], [Title], [Description]) values (7, 2, 2, "Trades for Amp?", "I don't. Guess it wasn't meant to be. Good luck!");
insert into [Comment] ([Id], [ItemId], [UserId], [Title], [Description]) values (8, 2, 1, "Trades for Amp?", "I have a 68' Princeton Reverb Reissue."); 
insert into [Comment] ([Id], [ItemId], [UserId], [Title], [Description]) values (9, 2, 3, "Trades for Amp?", "Definately interested. Call me. 555-555-5555.");
set identity_insert [Comment] off

set identity_insert [Item] on

insert into [Item] ([Id], [UserId], [CategoryId], [Title], [Description], [IsForSale], [SalePrice], [ImageUrl]) values (1, 2, 1, "1989 Fender Stratocaster", "Guitar is Candy Apple Red. It has upgraded Dimarzio pickups and a completely overhauled wiring harness.", 1, "1500", "https://2.bp.blogspot.com/-zLOSPWQ7dPc/UX3WY0JK_wI/AAAAAAAAJuk/I4rX1kxRJk0/s400/63+candy+apple+strat.JPG");
insert into [Item] ([Id], [UserId], [CategoryId], [Title], [Description], [IsForSale], [SalePrice], [ImageUrl]) values (2, 3, 7, "Crate GT212", "120 Watt Combo Amp. Don't H8 the Cr8", 1, "2000", "https://images.reverb.com/image/upload/s--RclooOh4--/t_card-square/v1568637603/mz9lk39capetodj4idn1.jpg");
insert into [Item] ([Id], [UserId], [CategoryId], [Title], [Description], [IsForSale], [SalePrice], [ImageUrl]) values (3, 2, 2, "MIM FENDER P BASS", "Navy Blue. Bought this on my 18th Birthday. Upgraded the Pickups to Lollars. Built in 2006-2007", 0, NULL, "https://3.bp.blogspot.com/_ETgjuuN-R-I/S1cu8JYFZjI/AAAAAAAAAZA/VGTs71yCYF0/s400/fender+bass+guitar.jpg"); 
insert into [Item] ([Id], [UserId], [CategoryId], [Title], [Description], [IsForSale], [SalePrice], [ImageUrl]) values (4, 3, 3, "Slingerland Drum Kit", "1960's Brown Vintage Kit. Normal wear and tear on an older kit", 0, NULL, "https://www.vintagedrum.com/wp-content/uploads/2016/04/VI-2936-Sling-4pc-mahog.jpg");
insert into [Item] ([Id], [UserId], [CategoryId], [Title], [Description], [IsForSale], [SalePrice], [ImageUrl]) values (5, 1, 1, "Gibson SG", "1960's Vintage SG. Normal wear and tear on an older guitar", 0, NULL, "https://i.ebayimg.com/images/g/9XYAAOSwe8ldEla9/s-l300.jpg");
insert into [Item] ([Id], [UserId], [CategoryId], [Title], [Description], [IsForSale], [SalePrice], [ImageUrl]) values (6, 4, 1, "Gibson Firebird", "1960's Vintage Firebird. Normal wear and tear on an older guitar", 0, NULL, "https://www.vintageandrare.com/uploads/products/43180/1650512/big.jpg");
set identity_insert [Item] off




set identity_insert [User] on
insert into [User] (Id, FirebaseUserId, FirstName, LastName, Email) values (1, '00sUFXwjjFf2WL5KZozXXXWcnBj1', 'Erykah', 'Sanford', 'erykah@erykah.com');
insert into [User] (Id, FirebaseUserId, FirstName, LastName, Email) values (2, 'Do0QqiO9ImY844uKcThTuv5bzpD2', 'Tim', 'Jones', 'tim@tim.com');
insert into [User] (Id, FirebaseUserId, FirstName, LastName, Email) values (3, 'VDvuX0VqnOfzUawFVnTW7wfJYi33', 'John', 'Maplethorpe', 'john@john.com');
insert into [User] (Id, FirebaseUserId, FirstName, LastName, Email) values (4, 'ubiEyDxUJuPDpc4YBu9qbbLShAX2', 'Eva', 'Mendez', 'eva@eva.com');

set identity_insert [User] off