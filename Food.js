class Food
{
    constructor()
    {
        this.foodStock = 0;
        this.lastFed;
        this.image = loadImage("images/Milk.png");
    }

    display()
    {
        var x = 200, y = 200;

        imageMode(CENTER);
        image(this.image, x, y, 80, 80);

        if(this.foodStock != 0)
        {
            for(var i = 0; this.foodStock; i++)
            {
                if(i%10 == 0)
                {
                    x = 80;
                    y = y+50;
                }
                image(this.image, x, y, 50, 50);
                x = x+30;
            }
        }
    }

    getFoodStock()
    {
        return this.foodStock;
    } 

    getFedTime(lastFed)
    {
        this.lastFed = lastFed;
    }
    
    updateFoodStock(foodStock)
    {
        this.foodStock = foodStock;
    }
    
    deductFood()
    {
        if(this.foodStock>0){
            this.foodStock=this.foodStock-1;
           }
    }
}