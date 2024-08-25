INSERT INTO GAME()
VALUES();

INSERT INTO GAME_STATE(label, game_id)
VALUES(
    'My first game!',
    (SELECT MAX(id) FROM GAME)
);

INSERT INTO COUNTER_KIND(label)
VALUES('AFFINITY_PRISCILLA');

INSERT INTO COUNTER(current_value, counter_kind_id, game_state_id)
VALUES(
    0,
    (SELECT MAX(id) FROM COUNTER_KIND WHERE label = 'AFFINITY_PRISCILLA'),
    (SELECT MAX(id) FROM GAME_STATE WHERE label = 'My first game!')
);

INSERT INTO SOUND(description, file_path, kind)
VALUES('Slap sound', 'sounds/effects/slap.mp3', 'EFFECT');
INSERT INTO SOUND(description, file_path, kind)
VALUES('Everyday soundtrack', 'sounds/tracks/everyday.mp3', 'SOUNDTRACK');

INSERT INTO GAME_CHARACTER(name, color)
VALUES('Narrator', '#ffffff');
INSERT INTO GAME_CHARACTER(name, color)
VALUES('Priscilla', '#ff0000');
INSERT INTO GAME_CHARACTER(name, color)
VALUES('Melito', '#ffc0cb');

INSERT INTO CHARACTER_IMAGE(description, mood, file_path, character_id)
VALUES(
    'Regular Priscilla',
    'REGULAR',
    'images/characters/priscilla/regular.png',
    (SELECT MAX(id) FROM GAME_CHARACTER WHERE name = 'Priscilla')
);

INSERT INTO BACKGROUND_IMAGE(description, file_path)
VALUES('School yard', 'images/backgrounds/school-yard.png');

INSERT INTO NODE(description, kind)
VALUES(
    'Root node, main storyline',
    'ROOT'
);
INSERT INTO NODE(description, kind, background_id, soundtrack_id, parent_id)
VALUES(
    'Melito is late',
    'DIALOG',
    (SELECT MAX(id) FROM BACKGROUND_IMAGE WHERE description = 'School yard'),
    (SELECT MAX(id) FROM SOUND WHERE description = 'Everyday soundtrack'),
    (SELECT MAX(id) FROM NODE WHERE description = 'Root node, main storyline')
);

INSERT INTO NODE(description, kind, text, background_id, soundtrack_id, parent_id)
VALUES(
    'Melito chooses how to address the fact that he''s late - bold option',
    'CHOICE',
    'Io NON sono in ritardo!',
    (SELECT MAX(id) FROM BACKGROUND_IMAGE WHERE description = 'School yard'),
    (SELECT MAX(id) FROM SOUND WHERE description = 'Everyday soundtrack'),
    (SELECT MAX(id) FROM NODE WHERE description = 'Melito is late')
);
INSERT INTO NODE(description, kind, text, background_id, soundtrack_id, parent_id)
VALUES(
    'Melito chooses how to address the fact that he''s late - meek option',
    'CHOICE',
    'P-posso spiegare!',
    (SELECT MAX(id) FROM BACKGROUND_IMAGE WHERE description = 'School yard'),
    (SELECT MAX(id) FROM SOUND WHERE description = 'Everyday soundtrack'),
    (SELECT MAX(id) FROM NODE WHERE description = 'Melito is late')
);


INSERT INTO LINE(text, mood, character_id, dialog_id)
VALUES(
    'Sei in ritardo!',
    'REGULAR',
    (SELECT MAX(id) FROM GAME_CHARACTER WHERE name = 'Priscilla'),
    (SELECT MAX(id) FROM NODE WHERE description = 'Melito is late')
);
INSERT INTO LINE(text, mood, character_id, dialog_id)
VALUES(
    'S-sono in ritardo?!',
    'REGULAR',
    (SELECT MAX(id) FROM GAME_CHARACTER WHERE name = 'Melito'),
    (SELECT MAX(id) FROM NODE WHERE description = 'Melito is late')
);

INSERT INTO OUTCOME(modifier, counter_kind, choice_id)
VALUES(
    -1,
    'AFFINITY_PRISCILLA',
    (SELECT MAX(id) FROM NODE WHERE description = 'Melito chooses how to address the fact that he''s late - meek option')
);