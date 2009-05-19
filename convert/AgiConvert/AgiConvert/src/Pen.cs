using System;
using System.IO;
using System.Text;
using System.Xml;
using System.Collections.Generic;

namespace AGI
{
  public enum PenType
  {
    Solid = 0,
    Splatter = 1
  }

  public enum PenShape
  {
    Square = 0,
    Circle = 1
  }

  public class Square
  {
    public static Square[] Squares = new Square[8];
    
    static Square()
    {
      Squares[0] = new Square(0, 0, 0);
      Squares[1] = new Square(1, 1, 1);
      Squares[2] = new Square(1, 2, 2);
      Squares[3] = new Square(2, 3, 3);
      Squares[4] = new Square(2, 4, 4);
      Squares[5] = new Square(3, 5, 5);
      Squares[6] = new Square(3, 6, 6);
      Squares[7] = new Square(4, 7, 7);
    }
    
    public Square(int offsetX, int offsetY, int size)
    {
      this.OffsetX = offsetX;
      this.OffsetY = offsetY;
      this.Size = size;
    }

    public int OffsetX;
    public int OffsetY;
    public int Size;
  }

  public class Circle
  {
    public static Circle[] Circles = new Circle[8];
    
    static Circle()
    {
      Circles[0] = new Circle(0, 0, 0, new byte[] { 1 });
      Circles[1] = new Circle(1, 1, 1, new byte[] { 1, 1, 1, 1, 1, 1 });
      Circles[2] = new Circle(1, 2, 2, new byte[] { 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0 });
      Circles[3] = new Circle(2, 3, 3, new byte[] { 0, 1, 1, 0, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 0, 1, 1, 0 });
      Circles[4] = new Circle(2, 4, 4, new byte[] { 0, 0, 1, 0, 0, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 0, 0, 1, 0, 0 });
      Circles[5] = new Circle(3, 5, 5, new byte[] { 0, 0, 1, 1, 0, 0, 0, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 0, 0, 0, 1, 1, 0, 0 });
      Circles[6] = new Circle(3, 6, 6, new byte[] { 0, 0, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 0, 0 });
      Circles[7] = new Circle(4, 7, 7, new byte[] { 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0 });
    }
    
    public Circle(int offsetX, int offsetY, int size, byte[] data)
    {
      this.OffsetX = offsetX;
      this.OffsetY = offsetY;
      this.Size = size;
      this.Data = data;
    }

    public int OffsetX;
    public int OffsetY;
    public int Size;
    public byte[] Data;
    
  }
}