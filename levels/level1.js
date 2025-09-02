const level1 = new Level(
    [
        new Background('../img/5_background/layers/air.png', -720),
        new Background('../img/5_background/layers/3_third_layer/2.png', -720),
        new Background('../img/5_background/layers/2_second_layer/2.png', -720),
        new Background('../img/5_background/layers/1_first_layer/2.png', -720),

        new Background('../img/5_background/layers/air.png', 0),
        new Background('../img/5_background/layers/3_third_layer/1.png', 0),
        new Background('../img/5_background/layers/2_second_layer/1.png', 0),
        new Background('../img/5_background/layers/1_first_layer/1.png', 0),

        new Background('../img/5_background/layers/air.png', 720),
        new Background('../img/5_background/layers/3_third_layer/2.png', 720),
        new Background('../img/5_background/layers/2_second_layer/2.png', 720),
        new Background('../img/5_background/layers/1_first_layer/2.png', 720),

        new Background('../img/5_background/layers/air.png', 720*2),
        new Background('../img/5_background/layers/3_third_layer/1.png', 720*2),
        new Background('../img/5_background/layers/2_second_layer/1.png', 720*2),
        new Background('../img/5_background/layers/1_first_layer/1.png', 720*2),

        new Background('../img/5_background/layers/air.png', 720*3),
        new Background('../img/5_background/layers/3_third_layer/2.png', 720*3),
        new Background('../img/5_background/layers/2_second_layer/2.png', 720*3),
        new Background('../img/5_background/layers/1_first_layer/2.png', 720*3)
    ],
    [
        new Cloud()
    ],
    [
        new ChickenSmall(),
        new ChickenSmall(),
        new ChickenSmall(),
        new Chicken(),
        new Chicken(),
        new Chicken(),
    ],
    [
        new Endboss()
    ],
    [
        new Bottle(),
        new Bottle(),
        new Bottle(),
        new Bottle(),
        new Bottle(),
        new Bottle(),
        new Bottle(),
        new Bottle(),
        new Bottle(),
        new Bottle()
    ],
    [
        new Coin(),
        new Coin(),
        new Coin(),
        new Coin(),
        new Coin(),
        new Coin(),
        new Coin(),
        new Coin(),
        new Coin(),
        new Coin()
    ]
);